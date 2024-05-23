import { Module } from '@nestjs/common';
import { EmployerServiceController } from './employer-service.controller';
import { EmployerServiceService } from './employer-service.service';

@Module({
  imports: [],
  controllers: [EmployerServiceController],
  providers: [EmployerServiceService],
})
export class EmployerServiceModule {}
