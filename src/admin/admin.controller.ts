import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { HandleDoctorRequestDto } from './dto/handle-doctor-request.dto';
import { SendAdminInviteDto } from './dto/send-user-email.dto';
import { FindUserByEmailDto } from './dto/find-user-email.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Get all users
  @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
  }

  // Get all patients
  @Get('patients')
  async getAllPatients() {
    return this.adminService.getAllPatients();
  }

  // Get all doctors
  @Get('doctors')
  async getAllDoctors() {
    return this.adminService.getAllDoctors();
  }

  // Update user
  @Put('user')
  async updateUser(@Body() data: UpdateUserDto) {
    return this.adminService.updateUser(data);
  }

  // Delete user
  @Delete('user')
  async deleteUser(@Body() data: DeleteUserDto) {
    return this.adminService.deleteUser(data);
  }

  // Handle doctor request (approve/reject)
  @Put('doctor-request')
  async handleDoctorRequest(@Body() data: HandleDoctorRequestDto) {
    return this.adminService.handleDoctorRequest(data);
  }

  // Send admin invitation
  @Post('invite-admin')
  async sendAdminInvite(@Body() data: SendAdminInviteDto) {
    return this.adminService.sendAdminInvite(data);
  }

  // Find user by email
  @Post('find-user')
  async findUserByEmail(@Body() data: FindUserByEmailDto) {
    return this.adminService.findUserByEmail(data);
  }
}
