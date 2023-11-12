import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateWithdrawal } from '@/models/balance/types/create-withdrawal.interface';
import { Withdrawal } from '@/models/balance/schemas/withdrawal.schema';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';
import { Pagination } from '@/common/utils/pagination';
import { UpdateWithdrawalDto } from '@/models/balance/dto/update-withdrawal.dto';

@Injectable()
export class WithdrawalRepository {
  constructor(@InjectModel(Withdrawal.name) private withdrawalModel: Model<Withdrawal>) {}

  async findAll(queryParam: PaginationQueryDto) {
    const pagination = new Pagination(queryParam);
    const { query, options } = pagination.parse();
    const results = await this.withdrawalModel.find(query, null, options).exec();
    return await pagination.wrapPagination(results, this.withdrawalModel);
  }

  async create(data: CreateWithdrawal) {
    const newBalance = await this.withdrawalModel.create({
      status: 'waiting',
      user: data.userId,
      balanceHistory: data.balanceHistory,
      amount: data.amount,
      bankCard: data.bankCard,
      ownerName: data.ownerName,
    });
    return newBalance.save();
  }

  async updateOne(id: string, data: UpdateWithdrawalDto) {
    return await this.withdrawalModel
      .findByIdAndUpdate(
        id,
        {
          status: data.status,
          description: data.description,
        },
        { new: true },
      )
      .exec();
  }
}
