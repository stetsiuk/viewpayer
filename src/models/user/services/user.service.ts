import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '@/models/user/dto/create-user.dto';
import { BalanceService } from '@/models/balance/services/balance.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly balanceService: BalanceService,
  ) {}

  async getUserByEmailOrUsername(login: string) {
    return this.userRepository.getUserByEmailOrUsername(login);
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(dto: CreateUserDto) {
    const newUser = await this.userRepository.createUser({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    await this.balanceService.create(newUser.id);

    return newUser;
  }

  async checkIsUserAlreadyRegistered(email: string, username: string): Promise<boolean> {
    const userByEmail = await this.userRepository.getUserByEmail(email);
    if (userByEmail) {
      return true;
    }

    const userByUsername = await this.userRepository.getUserByUsername(username);
    if (userByUsername) {
      return true;
    }
    return false;
  }
}
