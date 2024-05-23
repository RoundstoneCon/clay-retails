import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World! David Enabs';
  }
}
