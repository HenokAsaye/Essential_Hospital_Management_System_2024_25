import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetAppointmentsDto } from './dto/get-appointments.dto';
import { GetMedicalHistoryDto } from './dto/get-medical-history.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  // Get Appointments
  async getAppointments(getAppointmentsDto: GetAppointmentsDto) {
    const { patientId } = getAppointmentsDto;
    return this.prisma.appointment.findMany({
      where: { patientId },
      include: {
        Doctor: {
          select: {
            name: true, 
          },
        },
      },
    });
  }

  // Get Medical History
  async getMedicalHistory(getMedicalHistoryDto: GetMedicalHistoryDto) {
    const { patientId } = getMedicalHistoryDto;
    return this.prisma.patient.findUnique({
      where: { userId: patientId },
      select: {
        medicalHistory: true,
      },
    });
  }
}
