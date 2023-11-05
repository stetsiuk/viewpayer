import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';

import { AuthenticationService } from './services/authentication.service';

import { tokenConfig } from '@/configs/jwt.config';
import { RESPONSE_MESSAGE } from '@/common/messages';

import { RegistrationUserDto } from './dto/registration-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('registration')
  @HttpCode(201)
  async registration(@Body() dto: RegistrationUserDto) {
    await this.authenticationService.registration(dto);
    return RESPONSE_MESSAGE.SUCCESSFUL;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authenticationService.login(dto);
    const token = await this.authenticationService.generateAuthToken({ id: user.id, role: user.role });
    res.cookie('token', token, tokenConfig);
    return user;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return RESPONSE_MESSAGE.SUCCESSFUL;
  }
}
