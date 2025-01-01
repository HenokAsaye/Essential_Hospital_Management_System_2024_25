import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, DoctorRequest, Role, requestStatus } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { HandleDoctorRequestDto } from './dto/handle-doctor-request.dto';
import { SendAdminInviteDto } from './dto/send-user-email.dto';
import { FindUserByEmailDto } from './dto/find-user-email.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Get all users (Patients, Doctors, Admins)
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // Get all patients
  async getAllPatients(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: Role.Patient },
    });
  }

  // Get all doctors
  async getAllDoctors(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role: Role.Doctor },
    });
  }

  // Update user details
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

  // Delete a user by ID
  async deleteUser(data: DeleteUserDto): Promise<User> {
    return this.prisma.user.delete({
      where: { id: data.userId },
    });
  }

  // Approve or Reject doctor account requests
  async handleDoctorRequest(
    data: HandleDoctorRequestDto,
  ): Promise<DoctorRequest> {
    return this.prisma.doctorRequest.update({
      where: { id: data.userId },
      data: { status: data.status },
    });
  }

  // Admin invitation (send registration link/code)
  async sendAdminInvite(data: SendAdminInviteDto): Promise<string> {
    // Generate a unique invitation code or token
    const inviteCode = Math.random().toString(36).substring(2, 15);

    // Send invitation email (mock implementation)
    await this.sendInviteEmail(data.email, inviteCode);

    // Return the generated invite link (assuming this URL for simplicity)
    return `http://yourapp.com/register/admin?code=${inviteCode}`;
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

  // Find a user by their email
  async findUserByEmail(data: FindUserByEmailDto): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: data.email },
    });
  }
}
