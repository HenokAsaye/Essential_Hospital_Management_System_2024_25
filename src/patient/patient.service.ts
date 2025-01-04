import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}
  async getAppointments(userId: number) {
    return this.prisma.appointment.findMany({
      where: { patientId: userId },
      include: {
        Doctor: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async getMedicalHistory(userId: number) {
    return this.prisma.patient.findUnique({
      where: { userId },
      select: {
        medicalHistory: true,
      },
    });
  }
}
