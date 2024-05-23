import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('hi')
  show() {
    return 'hi';
  }

  @Post('admin/register')
  async registerAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
   return await this.authService.registerAdmin(createAdminDto);
  }

  // @Post('login')
  // async login(@Body() loginAdminDto: LoginAdminDto) {
  //   const result = await this.authServiceClient
  //     .send('auth.login', loginAdminDto)
  //     .toPromise();
  //   return result;
  // }
}
