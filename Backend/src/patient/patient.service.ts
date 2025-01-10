import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}
  async getAppointments(userId: number) {
    try {
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
    }catch(error){

    }
  }
  async getMedicalHistory(userId: number) {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { userId },
        select: {
          medicalHistory: true, 
        },
      });
      return patient?.medicalHistory ; 
    } catch (error) {
      throw new UnauthorizedException('Internal Server Error');
    }
  }
}
