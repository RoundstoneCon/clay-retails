import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from './config/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigModule globally available
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/main/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICROSERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'auth-service-client',
              brokers: [configService.get<string>('KAFKA_BROKER')],
            },
            consumer: {
              groupId: 'auth-consumer',
            },
          },
        }),
        inject: [ConfigService],
      },
      // {
      //   name: 'EMPLOYER_MICROSERVICE',
      //   useFactory: (configService: ConfigService) => ({
      //     transport: Transport.KAFKA,
      //     options: {
      //       client: {
      //         clientId: 'employer-service-client',
      //         brokers: [configService.get<string>('KAFKA_BROKER')],
      //       },
      //       consumer: {
      //         groupId: 'employer-consumer',
      //       },
      //     },
      //   }),
      //   inject: [ConfigService],
      // },
      // {
      //   name: 'STAFF_MICROSERVICE',
      //   useFactory: (configService: ConfigService) => ({
      //     transport: Transport.KAFKA,
      //     options: {
      //       client: {
      //         clientId: 'staff-service-client',
      //         brokers: [configService.get<string>('KAFKA_BROKER')],
      //       },
      //       consumer: {
      //         groupId: 'staff-consumer',
      //       },
      //     },
      //   }),
      //   inject: [ConfigService],
      // },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
