import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


/**
 * import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { generateToken } from 'common/utils/jwt';
import { hashPassword, comparePassword } from 'common/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createAdminDto: CreateAdminDto) {
    const existingUser = await this.adminModel.findOne({ email: createAdminDto.email });
    if (existingUser) {
      throw new UnprocessableEntityException('Email already exists.');
    }

    const hashedPassword = await hashPassword(createAdminDto.password);
    const newUser = new this.adminModel({
      ...createAdminDto,
      password: hashedPassword,
    });
    await newUser.save();

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

 */
