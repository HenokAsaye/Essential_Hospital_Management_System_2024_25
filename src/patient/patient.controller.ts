import { Controller, Get, Param, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { GetAppointmentsDto } from './dto/get-appointments.dto';
import { GetMedicalHistoryDto } from './dto/get-medical-history.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // Get Patient Appointments
  @Get('appointments')
  async getAppointments(@Query() getAppointmentsDto: GetAppointmentsDto) {
    return this.patientService.getAppointments(getAppointmentsDto);
  }

  // Get Patient Medical History
  @Get('medical-history')
  async getMedicalHistory(@Query() getMedicalHistoryDto: GetMedicalHistoryDto) {
    return this.patientService.getMedicalHistory(getMedicalHistoryDto);
  }
}
