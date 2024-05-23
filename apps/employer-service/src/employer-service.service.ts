import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
