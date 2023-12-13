import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { UserRole } from '@/models/user/types/user-roles.interface';
import { UserService } from '@/models/user/services/user.service';
import { BcryptService } from '@/authentication/services/bcrypt.service';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    if (await this.isCollectionEmpty()) {
      await this.seedData();
      console.log('User collection seeded.');
    }
  }

  private async isCollectionEmpty() {
    return (await this.userModel.countDocuments()) === 0;
  }

  private async seedData() {
    const userData = [
      {
        phoneNumber: 'admin',
        password: '123456',
        role: 'admin' as UserRole,
      },
      {
        phoneNumber: 'user',
        password: '123456',
        role: 'user' as UserRole,
      },
    ];

    for (const user of userData) {
      await this.userService.registerUser({
        phoneNumber: user.phoneNumber,
        hashPassword: await this.bcryptService.hashPassword(user.password),
        role: user.role,
        referredBy: '',
      });
    }
  }
}
