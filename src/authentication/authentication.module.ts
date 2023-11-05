import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { BcryptService } from './services/bcrypt.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UserModule } from '@/models/user/user.module';
import { getJwtConfig } from '@/configs/jwt.config';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, BcryptService, AccessTokenStrategy],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
})
export class AuthenticationModule {}
