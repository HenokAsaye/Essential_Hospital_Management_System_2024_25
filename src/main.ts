import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Point to the exact path where the static files are located
  app.useStaticAssets(join(__dirname, '..', '..', 'Frontend', 'public')); 

  console.log('Static files served from:', join(__dirname, '..', '..', 'Frontend', 'public'));

  app.enableCors({
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(cookieParser());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
