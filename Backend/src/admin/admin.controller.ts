import { Controller, Get, Post, Put, Delete, Body,Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import {requestDto} from './dto/requests.dto';
import { HttpException,HttpStatus } from '@nestjs/common';
import { SendAdminInviteDto } from './dto/send-user-email.dto';
import { FindUserByEmailDto } from './dto/find-user-email.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('users')
  async getUsers() {
    return this.adminService.getUsers();
  }
  @Get('patients')
  async getAllPatients() {
    return this.adminService.getAllPatients();
  }
  @Get('doctors')
  async getAllDoctors() {
    return this.adminService.getAllDoctors();
  }
  @Put('updateuser')
  async updateUser(@Body() data: UpdateUserDto) {
    return this.adminService.updateUser(data);
  }
  @Delete('deleteuser')
  async deleteUser(@Body() data: DeleteUserDto) {
    return this.adminService.deleteUser(data);
  }
  @Get('doctorRequests')
  async getAllDoctorRequests(){
    return this.adminService.getAllRequest()
  }
  @Post('invite-admin')
  async inviteadmin(@Body() data: SendAdminInviteDto) {
    return this.adminService.inviteAdmin(data);
  }
  @Post('find-user')
  async findUserByEmail(@Body() data: FindUserByEmailDto) {
    return this.adminService.findUserByEmail(data);
  }
  @Patch('accept')
  async acceptDoctorRequest(@Body() data: requestDto): Promise<{ message: string }> {
    try {
      await this.adminService.acceptDoctorRequest(data);
      return { message: 'Doctor request accepted successfully.' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Delete('declineRequest')
  async declineDoctorRequest(@Body() data: requestDto): Promise<{ message: string }> {
      try {
          await this.adminService.declineDoctorRequest(data);
          return { message: 'Doctor request declined successfully' };
      } catch (error) {
          throw new HttpException(
              {
                  status: HttpStatus.BAD_REQUEST,
                  error: error.message,
              },
              HttpStatus.BAD_REQUEST,
          );
      }
  }
}
