import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs'; // Import fs module

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Create upload directories if they don't exist
  fs.mkdirSync('./uploads/videos', { recursive: true });
  fs.mkdirSync('./uploads/thumbnails', { recursive: true });
  fs.mkdirSync('./uploads/profile-pics', { recursive: true }); // New folder for profile pictures


  // Serve static files
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 4000);  // Ensure backend runs on port 4000
}
bootstrap();
