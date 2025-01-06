import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtAuthMiddleware } from './auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // Add this import
import { join } from 'path';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    AuthModule,
    PatientModule,
    AdminModule,
    DoctorModule,
    PrismaModule,
    ConfigModule,
    
    // Serve static files from the 'public' folder in the frontend
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'Frontend', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/signup', method: RequestMethod.POST },
        { path: '/auth/signupdoctor', method: RequestMethod.POST },
        { path: '/auth/firstadmin', method: RequestMethod.POST },
        { path: '/auth/loginadmin', method: RequestMethod.POST },
        { path: '/index.html', method: RequestMethod.GET }, // Exclude index.html
        { path: '/', method: RequestMethod.GET }, // Exclude root
        { path: '(.*)', method: RequestMethod.GET } // Exclude all static files
      )
      .forRoutes('*');
  }
}
