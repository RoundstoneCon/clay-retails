import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { generateToken } from '../../common/utils/jwt';
import { comparePassword, hashPassword } from '../../common/utils/bcrypt';
import { AdminRepository } from './admin.repository';
import { customUserId } from '../../common/utils/custom-id';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly adminRepository: AdminRepository,
  ) {}

  async register(createAdminDto: CreateAdminDto) {
    const existingUser = await this.adminModel.findOne({ email: createAdminDto.email });
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists.');
    }

    const hashedPassword = await hashPassword(createAdminDto.password);
    const newUser = await this.adminRepository.create({
      ...createAdminDto,
      password: hashedPassword,
      public_id: customUserId('ADM')
    });
    // await newUser.save();

    const token = generateToken(this.jwtService, this.configService, { userId: newUser._id });

    return { user: newUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.adminModel.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = generateToken(this.jwtService, this.configService, { userId: user._id });
    return { user, token };
  }

 
}
