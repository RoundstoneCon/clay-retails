import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminRepository } from './admin.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule,
    ConfigModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, JwtModule,
    ConfigModule],
  exports: [AdminService]
})
export class AdminModule {}
