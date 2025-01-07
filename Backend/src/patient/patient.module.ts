import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from '../../prisma/prisma.service';  
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ,
    }),
  ],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
  exports: [PatientService],
})
export class PatientModule {}
