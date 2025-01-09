import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    HttpException,
    HttpStatus,
    NotFoundException,
    BadRequestException
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
async scheduleAppointment(@Body() scheduleDto: ScheduleDto) {
    try {
        // 
        const parsedDoctorId = parseInt(scheduleDto.doctorId);
        const parsedPatientId = parseInt(scheduleDto.patientId);

        if (isNaN(parsedDoctorId) || isNaN(parsedPatientId)) {
            throw new BadRequestException('Invalid doctorId or patientId format.');
        }

        scheduleDto.doctorId = parsedDoctorId.toString();
        scheduleDto.patientId = parsedPatientId.toString();

        return await this.doctorService.scheduleAppointment(scheduleDto);
    } catch (error) {
        if (error instanceof NotFoundException) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        } else if (error instanceof BadRequestException) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
}

























  