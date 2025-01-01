import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { DoctorService } from './doctor.service';
  import { SearchDto } from './dto/searchdto';
  import { MedicalDto } from './dto/medicaldto';
  import { ScheduleDto } from './dto/schedule.dto';
  
  @Controller('doctor')
  export class DoctorController {
    constructor(private readonly doctorService: DoctorService) {}
    @Get('patients')
    async getPatients(@Query() searchDto: SearchDto) {
      try {
        return await this.doctorService.getPatients(searchDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Post('edit-medical-record')
    async editMedicalRecord(
      @Body() medicalDto: MedicalDto,
      @Query() searchDto: SearchDto,
    ) {
      try {
        return await this.doctorService.editMedicalRecord(medicalDto, searchDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Post('schedule-appointment')
    async scheduleAppointment(
      @Body() scheduleDto: ScheduleDto,
      @Query() searchDto: SearchDto,
    ) {
      try {
        return await this.doctorService.scheduleAppointment(scheduleDto, searchDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  