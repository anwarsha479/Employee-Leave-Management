import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enables API access from frontend applications.
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Employee Leave Management API')
    .setDescription('Employee Leave Management System APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`Application running on: http://localhost:${port}`);

  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();
