import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtAuthMiddleware } from './auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import {AuthModule} from "./auth/auth.module"

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    AuthModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/signup', method: RequestMethod.POST},
        { path: '/auth/signupdoctor', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
