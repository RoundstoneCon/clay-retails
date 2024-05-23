import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { ApiResponseService } from 'response/api-response';
import JwtAuthGuard from '../../guards/jwt-auth.guard';
import { Admin } from './entities/admin.entity';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly apiResponseService: ApiResponseService,
  ) {}

  @Post('register')
  async register(
    @Body() createAdminDto: CreateAdminDto,
    @Res() response: Response,
  ) {
    try {
      const { user, token } = await this.adminService.register(createAdminDto);
      response.cookie('Authentication', token, { httpOnly: true });
      return response.status(201).json(this.apiResponseService.success('Registration successful', user));
    } catch (error) {
      return response.status(400).json(this.apiResponseService.failure('Registration failed', error.message));
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto, @Res() response: Response) {
    const { user, token } = await this.adminService.login(
      loginAdminDto.email,
      loginAdminDto.password,
    );
    response.cookie('Authentication', token, { httpOnly: true });
    return response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: Admin) {
    return user;
  }
}
