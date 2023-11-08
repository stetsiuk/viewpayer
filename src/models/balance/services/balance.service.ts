import { Injectable } from '@nestjs/common';

import { BalanceRepository } from '@/models/balance/repositories/balance.repository';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  async findOne(userId: string) {
    return await this.balanceRepository.findOne(userId);
  }

  async create(userId: string) {
    return await this.balanceRepository.create(userId);
  }

  async update(userId: string, amount: number) {
    return await this.balanceRepository.updateAmount(userId, amount);
  }
}
