import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(3000);
}
bootstrap();
