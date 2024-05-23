import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Controller()
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @MessagePattern('createEmployer')
  create(@Payload() createEmployerDto: CreateEmployerDto) {
    return this.employerService.create(createEmployerDto);
  }

  @MessagePattern('findAllEmployer')
  findAll() {
    return this.employerService.findAll();
  }

  @MessagePattern('findOneEmployer')
  findOne(@Payload() id: number) {
    return this.employerService.findOne(id);
  }

  @MessagePattern('updateEmployer')
  update(@Payload() updateEmployerDto: UpdateEmployerDto) {
    return this.employerService.update(updateEmployerDto.id, updateEmployerDto);
  }

  @MessagePattern('removeEmployer')
  remove(@Payload() id: number) {
    return this.employerService.remove(id);
  }
}
