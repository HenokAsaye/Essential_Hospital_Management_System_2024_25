import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5000', // Adjust this to your frontend's URL
    credentials: true, // Allow cookies
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transforms query and body parameters
    }),
  );
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
