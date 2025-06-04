import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Simple logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method} ${req.url}`, 'Request');
    next();
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('User Management API')
    .setDescription('API for managing users in memory')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger at localhost:3000/api

  await app.listen(3000);
}
bootstrap();
