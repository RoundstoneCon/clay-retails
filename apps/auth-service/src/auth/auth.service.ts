import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminService, StaffService, MerchantService, EmployerService } from './';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    // private readonly staffService: StaffService,
    // private readonly merchantService: MerchantService,
    // private readonly employerService: EmployerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string, userType: 'admin' | 'staff' | 'merchant' | 'employer') {
    switch (userType) {
      case 'admin':
        return this.adminService.login(email, password);
      case 'staff':
        return this.adminService.login(email, password);
        // return this.staffService.login(email, password);
      case 'merchant':
        return this.adminService.login(email, password);
        // return this.merchantService.login(email, password);
      case 'employer':
        return this.adminService.login(email, password);
        // return this.employerService.login(email, password);
    }
  }

  async login(user: any, response: Response) {
    const tokenPayload = { userId: user._id.toHexString() };

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });

    response.cookie('Authentication', token, { httpOnly: true });

    return { user, token };
  }
}
