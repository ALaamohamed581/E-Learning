import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { config as swaggerConfig } from './config/swaggerConfig';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.use(compression());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('pug');
  app.enableCors();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1', app, documentFactory);
  cloudinary.config(ConfigService);
  await app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port 8000');
  });
}

bootstrap();
/*
 */
