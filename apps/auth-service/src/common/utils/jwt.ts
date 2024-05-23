import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export function generateToken(jwtService: JwtService, configService: ConfigService, payload: object): string {
  return jwtService.sign(payload, {
    secret: configService.get<string>('jwt.secret'),
    expiresIn: configService.get<string>('jwt.expiration'),
  });
}
