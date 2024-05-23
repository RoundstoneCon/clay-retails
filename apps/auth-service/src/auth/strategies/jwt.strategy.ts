import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // Your validation logic
    return { userId: payload.sub, username: payload.username };
  }
}


// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Types } from 'mongoose';
// // import { TokenPayload } from '../auth.service';
// // import { UsersService } from '../users/users.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   // constructor(
//   //   configService: ConfigService,
//   //   private readonly usersService: UsersService,
//   // ) {
//   //   super({
//   //     jwtFromRequest: ExtractJwt.fromExtractors([
//   //       (request: any) => {
//   //         return request?.Authentication;
//   //       },
//   //     ]),
//   //     secretOrKey: configService.get('JWT_SECRET'),
//   //   });
//   // }

//   // async validate({ userId }: TokenPayload) {
//   //   try {
//   //     return await this.usersService.getUser({
//   //       _id: new Types.ObjectId(userId),
//   //     });
//   //   } catch (err) {
//   //     throw new UnauthorizedException();
//   //   }
//   // }
// }
