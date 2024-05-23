import { NestFactory } from '@nestjs/core';
import { EmployerServiceModule } from './employer-service.module';

async function bootstrap() {
  const app = await NestFactory.create(EmployerServiceModule);
  await app.listen(3000);
}
bootstrap();
