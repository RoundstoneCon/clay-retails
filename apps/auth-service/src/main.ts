import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { ApiResponseService } from 'response/api-response';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  app.useGlobalFilters(new ValidationExceptionFilter(new ApiResponseService()));
  await app.listen(configService.get<number>('port') || 3000);
}
bootstrap();
