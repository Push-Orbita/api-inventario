import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remueve todo lo que no está incluido en los DTOs
      forbidNonWhitelisted: true, // retorna bad request si hay propiedades en el objeto no requeridas
    })
  );

  setupSwagger(app);
  await app.listen(configService.get('PORT')!);
}

bootstrap();