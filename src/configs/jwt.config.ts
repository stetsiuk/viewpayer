import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const tokenConfig = {
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
  secure: true,
};

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => {
  return {
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRES_IN'),
    },
  };
};
