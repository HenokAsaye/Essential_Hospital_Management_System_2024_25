import { Injectable, InternalServerErrorException, NotFoundException , BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from './dto/searchdto';
import { MedicalDto } from './dto/medicaldto';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}
  async getPatients(searchDto: SearchDto) {
    const { name } = searchDto;
    try {
      const patients = await this.prisma.user.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
        include: { patient: true },
      });
      if (!patients.length) {
        throw new NotFoundException('No patients found matching the search criteria.');
      }
      return patients;
    } catch (error) {
      console.error('Error in getPatients:', error);
      throw new InternalServerErrorException('Failed to retrieve patients.');
    }
  }
  async editMedicalRecord(medicalDto: MedicalDto, searchDto: SearchDto) {
    const { name } = searchDto;
    const { diagnosis, note, date } = medicalDto;
  
    try {
      const user = await this.prisma.user.findFirst({
        where: { name: { equals: name, mode: 'insensitive' } },
        include: { patient: true },
      });
  
      if (!user || !user.patient) {
        throw new NotFoundException('Patient not found.');
      }
  
      // Ensure the date is a valid Date instance
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Invalid date format.');
      }
  
      const updatedHistory = [
        ...(Array.isArray(user.patient.medicalHistory) ? user.patient.medicalHistory : []),
        { diagnosis, note, date: parsedDate },
      ];
  
      const updatedPatient = await this.prisma.patient.update({
        where: { userId: user.id },
        data: { medicalHistory: updatedHistory },
      });
  
      return {
        message: 'Medical record updated successfully.',
        patient: updatedPatient,
      };
    } catch (error) {
      console.error('Error in editMedicalRecord:', error);
      throw new InternalServerErrorException('Failed to update the medical record.');
    }
  }
  
  async scheduleAppointment(scheduleDto: ScheduleDto, searchDto: SearchDto) {
    const { doctorId, date, time } = scheduleDto;
    const { name } = searchDto;
    try {
      const user = await this.prisma.user.findFirst({
        where: { name: { equals: name, mode: 'insensitive' } },
      });
      if (!user) {
        throw new NotFoundException('Patient not found.');
      }
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: doctorId },
      });
      if (!doctor) {
        throw new NotFoundException('Doctor not found.');
      }
      const parsedDate =  new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Invalid date format.');
      }
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(time)) {
        throw new BadRequestException('Invalid time format. Expected HH:mm.');
      }
      const appointment = await this.prisma.appointment.create({
        data: {
          patientId: user.id,
          doctorId: doctorId,
          date,
          time,
        },
      });
      return {
        message: 'Appointment scheduled successfully.',
        appointment,
      };
    } catch (error) {
      console.error('Error in scheduleAppointment:', error);
      throw new InternalServerErrorException('Failed to schedule the appointment.');
    }
  }
}
