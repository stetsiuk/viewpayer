import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { SwaggerSetup } from '@/configs/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: [...process.env.CLIENT_DOMAINS.split(',')],
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  SwaggerSetup(app);

  await app.listen(process.env.PORT);
}
bootstrap();
