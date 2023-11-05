import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '@/models/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmailOrUsername(login: string) {
    return this.userRepository.getUserByEmailOrUsername(login);
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.createUser({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
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
