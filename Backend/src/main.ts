import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the 'public' folder
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist', 'public'), {
    index: false, // Do not serve index.html from the public folder
  });

  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist'), {
    prefix: '/', // Serve all files directly from the root of dist
  });
  console.log("Serving static assets from:", join(__dirname, '..', '..', '..', 'Frontend', 'dist'));


  // Serve the 'modules' folder (ensure this is necessary for your frontend)
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist', 'modules'), {
    prefix: '/modules', // Serve files under the '/modules' route
  });

  // Serve the 'utility' folder
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'Frontend', 'dist', 'utility'), {
    prefix: '/utility', // Serve files under the '/utility' route
  });

  // Enable CORS for frontend requests
  app.enableCors({
    origin: 'http://localhost:5000',
    credentials: true,
  });

  // Global validation pipe
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
