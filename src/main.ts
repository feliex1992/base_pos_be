import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { TransformInterceptor } from './base/middleware/transform.interceptor';
import { CustomExceptionFilter } from './base/middleware/custom-exception.filter';

async function bootstrap() {
  const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
  const [vMajor, vMinor, vRevision] = pjson.version.split('.');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`api/v${vMajor}`);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('POS-BE')
    .setDescription('POS-BE API description')
    .setVersion(`v${vMajor}.${vMinor}.${vRevision}`)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();
  const options: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/v${vMajor}/docs`, app, document, options);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
