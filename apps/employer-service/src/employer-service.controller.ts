import { Controller, Get } from '@nestjs/common';
import { EmployerServiceService } from './employer-service.service';

@Controller()
export class EmployerServiceController {
  constructor(private readonly employerServiceService: EmployerServiceService) {}

  @Get()
  getHello(): string {
    return this.employerServiceService.getHello();
  }
}
