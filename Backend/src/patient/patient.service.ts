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
          medicalHistory: true, // Ensure we only get the medicalHistory array
        },
      });
  
      // Return an empty array if medicalHistory is null or undefined
      return patient?.medicalHistory || []; // Ensure it is an array even if there's no medical history
    } catch (error) {
      throw new UnauthorizedException('Internal Server Error');
    }
  }
}
