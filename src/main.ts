import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the 'public' folder in the frontend directory
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'public'), {
    index: 'index.html', // Automatically serve 'index.html' at the root URL
  });

  // Enable CORS for frontend requests
  app.enableCors({
    origin: 'http://localhost:5000', // Change this to match your frontend URL if different
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
