import { Controller, Get, Req } from '@nestjs/common';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Get('appointments')
  async getAppointments(@Req() req) {
    console.log(req.user)
    const userId = req.user?.userId; 
    if (!userId) {
      throw new Error('User not authenticated or user ID is missing');
    }
    return this.patientService.getAppointments(userId);
  }
  @Get('medical-history')
  async getMedicalHistory(@Req() req) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated or user ID is missing');
    }
    return this.patientService.getMedicalHistory(userId);
  }
}
