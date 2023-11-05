import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@/models/user/services/user.service';
import { BcryptService } from './bcrypt.service';

import { RegistrationUserDto } from '../dto/registration-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

import { JwtTokenPayload } from '@/authentication/types/jwt-token-payload.interface';
import { ERROR_MESSAGE } from '@/common/messages';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async registration(dto: RegistrationUserDto) {
    const { email, username, password } = dto;

    const isUserRegistered = await this.userService.checkIsUserAlreadyRegistered(email, username);

    if (isUserRegistered) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH_USER_ALREADY_REGISTERED);
    }

    const hashPassword = await this.bcryptService.hashPassword(password);

    await this.userService.createUser({
      username,
      email,
      password: hashPassword,
    });
  }

  public async login(dto: LoginUserDto) {
    const { login, password } = dto;

    const user = await this.userService.getUserByEmailOrUsername(login);
    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH_USER_NOT_FOUND);
    }
    const isPasswordCorrect = this.bcryptService.comparePassword(user.password, password);
    if (!isPasswordCorrect) {
      throw new BadRequestException(ERROR_MESSAGE.AUTH_PASSWORD_INVALID);
    }
    user.password = undefined;

    return user;
  }

  public async generateAuthToken(payload: JwtTokenPayload) {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
