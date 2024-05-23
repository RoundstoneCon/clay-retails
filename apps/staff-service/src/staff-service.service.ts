import { Injectable } from '@nestjs/common';

@Injectable()
export class StaffServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
