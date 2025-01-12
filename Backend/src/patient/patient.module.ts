import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
<<<<<<< HEAD
import { PrismaService } from 'Backend/prisma/prisma.service';  
import { PrismaModule } from 'Backend/prisma/prisma.module';
=======
import { PrismaService } from '../../prisma/prisma.service';  
import { PrismaModule } from '../../prisma/prisma.module';
>>>>>>> route
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
