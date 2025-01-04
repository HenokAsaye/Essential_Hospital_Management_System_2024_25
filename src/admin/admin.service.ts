import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, DoctorRequest, Role, requestStatus } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import {requestDto} from "./dto/requests.dto"
import { HandleDoctorRequestDto } from './dto/handle-doctor-request.dto';
import { SendAdminInviteDto } from './dto/send-user-email.dto';
import { FindUserByEmailDto } from './dto/find-user-email.dto';

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
    return this.prisma.user.delete({
      where: { id: data.userId },
    });
  }
  
  async sendAdminInvite(data: SendAdminInviteDto): Promise<string> {
    const inviteCode = Math.random().toString(36).substring(2, 15);
    await this.sendInviteEmail(data.email, inviteCode);
    return `http://yourapp.com/register/admin?code=${inviteCode}`;
  }

  async getAllRequest(){
    return this.prisma.doctorRequest.findMany(
      {where:{status:'PENDING'}}
    )
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
      // Update the status of the doctor request to 'REJECTED'
      const updatedRequest = await this.prisma.doctorRequest.update({
        where: { id: data.id },
        data: { status: 'REJECTED' },
      });
  
      if (!updatedRequest) {
        throw new UnauthorizedException("Doctor request not found!");
      }
  
      // Ensure the user exists
      const user = await this.prisma.user.findUnique({
        where: { id: updatedRequest.userId },
      });
  
      if (!user) {
        throw new UnauthorizedException("User not found");
      }
  
      // Delete the doctor request entry first to avoid foreign key constraint
      await this.prisma.doctorRequest.deleteMany({
        where: { userId: updatedRequest.userId },
      });
  
      // Now delete the user
      await this.prisma.user.delete({
        where: { id: updatedRequest.userId },
      });
  
      return { message: "Doctor request declined, and user deleted successfully." };
    } catch (error) {
      console.error('Error declining doctor request:', error.message);
      throw new Error(`Unable to process the doctor request: ${error.message}`);
    }
  }
  
  private async sendInviteEmail(
    email: string,
    inviteCode: string,
  ): Promise<void> {
    // This would be replaced with actual email sending logic using a library like nodemailer
    // Example of sending an email using nodemailer:
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Admin Invitation',
      text: `You are invited to become an admin. Use this link to complete your registration: 
             http://yourapp.com/register/admin?code=${inviteCode}`,
    });
    */
  
    console.log(`Sending invitation to ${email} with code ${inviteCode}`);
  }
  async findUserByEmail(data: FindUserByEmailDto): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: data.email },
    });
  }
}
