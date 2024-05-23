import { Controller, Get } from '@nestjs/common';
import { StaffServiceService } from './staff-service.service';

@Controller()
export class StaffServiceController {
  constructor(private readonly staffServiceService: StaffServiceService) {}

  @Get()
  getHello(): string {
    return this.staffServiceService.getHello();
  }
}
