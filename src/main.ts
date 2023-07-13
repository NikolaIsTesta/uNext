import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://localhost:8080', credentials: true },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  const Swaggerconfig = new DocumentBuilder()
    .setTitle('Only-up')
    .setDescription('Сваггеры-папашеры')
    .build();
const document = SwaggerModule.createDocument(app, Swaggerconfig);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);

}
bootstrap();
