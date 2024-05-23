import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientKafka,
  ) {}

  @Get('hi')
  show()
 {
  return 'hi';
 }
  // async onModuleInit() {
  //   this.authServiceClient.subscribeToResponseOf('auth.register');
  //   this.authServiceClient.subscribeToResponseOf('auth.login');
  //   await this.authServiceClient.connect();
  // }

  // @Post('auth/register')
  // async register(@Body() createAdminDto: CreateAdminDto, @Res() response: Response) {
  //   const result = await this.authServiceClient.send('auth.register', createAdminDto).toPromise();
  //   response.status(result.status).json(result);
  // }

  // @Post('auth/login')
  // async login(@Body() loginAdminDto: LoginAdminDto, @Res() response: Response) {
  //   const result = await this.authServiceClient.send('auth.login', loginAdminDto).toPromise();
  //   response.status(result.status).json(result);
  // }

  // other endpoints comes here

}
