import { Injectable } from '@nestjs/common';

import { BalanceHistoryRepository } from '@/models/balance/repositories/balance-history.repository';
import { BalanceService } from '@/models/balance/services/balance.service';
import { ChangeBalance } from '@/models/balance/types/balance.interface';

@Injectable()
export class BalanceHistoryService {
  constructor(
    private readonly balanceHistoryRepository: BalanceHistoryRepository,
    private readonly balanceService: BalanceService,
  ) {}

  async findAll(userId: string) {
    return await this.balanceHistoryRepository.findAll(userId);
  }

  async changeBalance(data: ChangeBalance) {
    await this.balanceService.update(data);
    return await this.balanceHistoryRepository.create(data);
  }
}
