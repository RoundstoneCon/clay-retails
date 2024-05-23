import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  async registerAdmin(createAdminDto) {
    try {
      const result = await this.authClient
        .send('auth.register', createAdminDto)
        .toPromise();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
