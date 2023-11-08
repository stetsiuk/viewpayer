import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Balance } from '@/models/balance/schemas/balance.schema';

@Injectable()
export class BalanceRepository {
  constructor(@InjectModel(Balance.name) private balanceModel: Model<Balance>) {}

  async findOne(userId: string) {
    return await this.balanceModel.findOne({ userId }, 'balance updatedAt -_id').exec();
  }

  async create(userId: string) {
    const newBalance = await this.balanceModel.create({ userId });
    return newBalance.save();
  }

  async updateAmount(userId: string, amount: number) {
    return await this.balanceModel
      .findOneAndUpdate(
        { userId },
        {
          $inc: {
            balance: amount,
          },
        },
        { new: true },
      )
      .exec();
  }
}
