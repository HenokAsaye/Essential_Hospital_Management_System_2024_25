<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'Backend/prisma/prisma.service';
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
=======
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async getAppointments(userId: number) {
    try {
      console.log('Querying appointments for user ID:', userId);

      // Step 1: Find the patient record using userId
      const patient = await this.prisma.patient.findUnique({
        where: { userId: userId },
        select: { id: true }, // This is the patientId
      });
      if (!patient) {
        console.error('No patient found with the given user ID');
        return []; 
      }
      const patientId = patient.id;
      const appointments = await this.prisma.appointment.findMany({
        where: { patientId: patientId },
      });

      if (appointments.length === 0) {
        console.log('No appointments found for the given patient ID');
        return [];
      }
      const detailedAppointments = await Promise.all(
        appointments.map(async (appointment) => {
          const doctor = await this.prisma.user.findUnique({
            where: { id: appointment.doctorId },
            select: { name: true }, 
          });
          return {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            doctorName: doctor ? doctor.name : 'Unknown Doctor', // Handle case where doctor is not found
          };
        })
      );

      console.log('Detailed appointments:', detailedAppointments);
      return detailedAppointments;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
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
      return patient?.medicalHistory;
    } catch (error) {
      throw new UnauthorizedException('Internal Server Error');
    }
>>>>>>> route
  }
}
