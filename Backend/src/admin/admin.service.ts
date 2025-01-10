import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User, DoctorRequest, Role, requestStatus } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import {requestDto} from "./dto/requests.dto"
import { HandleDoctorRequestDto } from './dto/handle-doctor-request.dto';
import { SendAdminInviteDto } from './dto/send-user-email.dto';
import { FindUserByEmailDto } from './dto/find-user-email.dto';
import { sendInviteEmail } from '../Email/Email';


@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async getAllPatients(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: Role.Patient },
    });
  }
  async getAllDoctors(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: Role.Doctor },
    });
  }
  async updateUser(data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: data.userId },
      data: {
        name: data.name,
        role: data.role,
        age: data.age,
        gender: data.gender,
        contact: data.contact,
      },
    });
  }
  async deleteUser(data: DeleteUserDto): Promise<User> {
    await this.prisma.doctorRequest.deleteMany({
      where: { userId: data.userId },
    });
    await this.prisma.doctor.deleteMany({
      where: { userId: data.userId },
    });
    await this.prisma.patient.deleteMany({
      where: { userId: data.userId },
    });
    return this.prisma.user.delete({
      where: { id: data.userId },
    });
  }
  
  async getAllRequest() {
    return this.prisma.doctorRequest.findMany({
      where: { status: 'PENDING' },
      include: {
        User: {
          select: {
            name: true,  
            email: true, 
          }
        }
      }
    });
  }
  
  async acceptDoctorRequest(data: requestDto): Promise<void> {
    try {
      const updatedRequest = await this.prisma.doctorRequest.update({
        where: { id: data.id }, 
        data: { status: 'APPROVED' },
      });
      if (!updatedRequest) {
        throw new Error('Doctor request not found');
      }
      const user = await this.prisma.user.findUnique({
        where: { id: updatedRequest.userId }, 
      });
  
      if (!user) {
        throw new Error('User not found for the doctor request');
      }
      await this.prisma.doctor.create({
        data: {
          userId: user.id,
          availability: 'Available', 
        },
      });
      console.log('Doctor request accepted, and user added to the doctor table.');
    } catch (error) {
      console.error('Error accepting doctor request:', error.message);
      throw new Error(`Unable to process the doctor request: ${error.message}`);
    }
  }


  async declineDoctorRequest(data: requestDto): Promise<{ message: string }> {
    try {
      const updatedRequest = await this.prisma.doctorRequest.update({
        where: { id: data.id },
        data: { status: requestStatus.REJECTED },
      });
  
      if (!updatedRequest) {
        throw new UnauthorizedException("Doctor request not found!");
      }
      const user = await this.prisma.user.findUnique({
        where: { id: updatedRequest.userId },
      });
  
      if (!user) {
        throw new UnauthorizedException("User not found");
      }
      await this.prisma.doctorRequest.deleteMany({
        where: { userId: updatedRequest.userId },
      });
      await this.prisma.user.delete({
        where: { id: updatedRequest.userId },
      });
  
      return { message: "Doctor request declined, and user deleted successfully." };
    } catch (error) {
      console.error('Error declining doctor request:', error.message);
      throw new Error(`Unable to process the doctor request: ${error.message}`);
    }
  }
  async inviteAdmin(data: SendAdminInviteDto): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const adminHomePageLink = `http://localhost:5000/admin.html`;  
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { userId: user.id },
    });
  
    if (existingAdmin) {
      throw new UnauthorizedException('user already An Admin')
    }
    await sendInviteEmail(user.email, adminHomePageLink);
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { role: Role.Admin },
    });
    await this.prisma.admin.create({
      data: {
        userId: updatedUser.id,
      },
    });
    return `Admin invite sent! The user can access the admin page at ${adminHomePageLink}`;
  }
  async findUserByEmail(data: FindUserByEmailDto): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: data.email },
    });
  }
}
