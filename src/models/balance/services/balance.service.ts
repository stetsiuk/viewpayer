import { Injectable } from '@nestjs/common';

import { BalanceRepository } from '@/models/balance/repositories/balance.repository';
import { UpdateBalance } from '@/models/balance/types/balance.interface';

@Injectable()
export class BalanceService {
  constructor(private readonly balanceRepository: BalanceRepository) {}

  async findOne(userId: string) {
    return await this.balanceRepository.findOne(userId);
  }

  async create(userId: string) {
    return await this.balanceRepository.create(userId);
  }

  async update(data: UpdateBalance) {
    return await this.balanceRepository.update(data);
  }
}
