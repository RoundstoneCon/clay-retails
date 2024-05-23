import { NestFactory } from '@nestjs/core';
import { StaffServiceModule } from './staff-service.module';

async function bootstrap() {
  const app = await NestFactory.create(StaffServiceModule);
  await app.listen(3000);
}
bootstrap();
