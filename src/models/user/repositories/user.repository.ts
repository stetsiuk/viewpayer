import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from '@/models/user/dto/create-user.dto';
import { User } from '@/models/user/schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string) {
    return this.userModel.findById(id).select('-password');
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async getUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  async getUserByEmailOrUsername(login: string) {
    return this.userModel.findOne({
      $or: [{ username: login }, { email: login }],
    });
  }

  async createUser(dto: CreateUserDto) {
    const { username, email, password } = dto;

    const user = await this.userModel.create({
      username,
      email,
      password,
      role: 'user',
    });

    return user.save();
  }
}
