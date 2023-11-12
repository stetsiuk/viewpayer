import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BalanceHistory } from '@/models/balance/schemas/balance-history.schema';
import { CreateBalanceHistory } from '@/models/balance/types/balance.interface';

@Injectable()
export class BalanceHistoryRepository {
  constructor(@InjectModel(BalanceHistory.name) private balanceHistoryModel: Model<BalanceHistory>) {}

  async findAll(userId: string) {
    return await this.balanceHistoryModel.find({ userId }).sort({ createdAt: -1 }).select('-userId').exec();
  }

  async create(data: CreateBalanceHistory) {
    const newBalanceHistory = await this.balanceHistoryModel.create({
      userId: data.userId,
      amount: data.amount,
      type: data.type,
    });
    return newBalanceHistory.save();
  }
}
