import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist', 'public'), {
    index: false, 
  });
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist'), {
    prefix: '/', 
  });
  console.log("Serving static assets from:", join(__dirname, '..', '..', '..', 'Frontend', 'dist'));
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist', 'modules'), {
    prefix: '/modules', 
  });
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist', 'utility'), {
    prefix: '/utility', 
  });
  app.enableCors({
    origin: 'http://localhost:5000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Application is running on http://localhost:${port}`);
}
bootstrap();
