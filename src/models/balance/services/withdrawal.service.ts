import { Injectable, MethodNotAllowedException } from '@nestjs/common';

import { WithdrawalRepository } from '@/models/balance/repositories/withdrawal.repository';
import { CreateWithdrawalData } from '@/models/balance/types/create-withdrawal.interface';
import { BalanceHistoryService } from '@/models/balance/services/balance-history.service';
import { BalanceService } from '@/models/balance/services/balance.service';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';
import { UpdateWithdrawalDto } from '@/models/balance/dto/update-withdrawal.dto';

@Injectable()
export class WithdrawalService {
  constructor(
    private readonly withdrawalRepository: WithdrawalRepository,
    private readonly balanceService: BalanceService,
    private readonly balanceHistoryService: BalanceHistoryService,
  ) {}

  async findAllWithdrawals(query: PaginationQueryDto) {
    return await this.withdrawalRepository.findAll(query);
  }

  async create(data: CreateWithdrawalData) {
    const { userId, ownerName, bankCard, amount } = data;

    const userBalance = await this.balanceService.findOne(userId);

    if (amount > userBalance.balance) {
      throw new MethodNotAllowedException(
        'The user does not have enough funds on the balance to withdraw the specified amount',
      );
    }

    const balanceHistory = await this.balanceHistoryService.changeBalance({
      userId,
      amount,
      type: 'withdrawal',
    });
    await this.withdrawalRepository.create({
      userId,
      ownerName,
      bankCard,
      amount,
      balanceHistory: balanceHistory.id,
    });
  }

  async updateOne(id: string, data: UpdateWithdrawalDto) {
    return await this.withdrawalRepository.updateOne(id, data);
  }
}
