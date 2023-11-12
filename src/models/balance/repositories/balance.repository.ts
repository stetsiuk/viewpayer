import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Balance } from '@/models/balance/schemas/balance.schema';
import { UpdateBalance } from '@/models/balance/types/balance.interface';

@Injectable()
export class BalanceRepository {
  constructor(@InjectModel(Balance.name) private balanceModel: Model<Balance>) {}

  async findOne(userId: string) {
    return await this.balanceModel.findOne({ userId }, 'balance withdrawal updatedAt -_id').exec();
  }

  async create(userId: string) {
    const newBalance = await this.balanceModel.create({ userId, balance: 0, withdrawal: 0 });
    return newBalance.save();
  }

  async update(data: UpdateBalance) {
    let balance: number = 0;
    let withdrawal: number = 0;

    switch (data.type) {
      case 'viewing':
        balance = data.amount;
        withdrawal = 0;
        break;
      case 'withdrawal':
        balance = -data.amount;
        withdrawal = data.amount;
        break;
    }

    return await this.balanceModel
      .findOneAndUpdate(
        { userId: data.userId },
        {
          $inc: {
            balance,
            withdrawal,
          },
        },
        { new: true },
      )
      .exec();
  }
}
