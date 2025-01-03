import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT ?? 4000);  // Ensure backend runs on port 4000
}
bootstrap();
