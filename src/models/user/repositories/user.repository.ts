import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserData } from '@/models/user/types/create-user.interface';
import { User } from '@/models/user/schemas/user.schema';
import { Subscription } from '@/models/subscription/schemas/subscription.schema';
import { Balance } from '@/models/balance/schemas/balance.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUserByReferralCode(referralCode: string) {
    return await this.userModel.findOne({ referralCode }).exec();
  }

  async getUserById(id: string) {
    return await this.userModel
      .findById(id)
      .populate<Balance>('balance', 'balance withdrawal updatedAt -_id')
      .populate<Subscription>({
        path: 'subscription',
        select: '-user',
        populate: {
          path: 'plan',
          select: '-createdAt -updatedAt',
        },
      })
      .select('-hashPassword')
      .exec();
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    return await this.userModel.findOne({ phoneNumber }).exec();
  }

  async getUserByReferralCode(referralCode: string) {
    return await this.userModel.findOne({ referralCode }).exec();
  }

  async createUser(data: CreateUserData) {
    const { phoneNumber, hashPassword, referralCode, referredBy, role } = data;

    const user = await this.userModel.create({
      phoneNumber,
      hashPassword,
      referralCode,
      referredBy,
      role,
    });
    return user.save();
  }
}
