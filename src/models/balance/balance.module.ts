import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BalanceController } from './balance.controller';
import { WithdrawalController } from '@/models/balance/withdrawal.controller';
import { BalanceService } from './services/balance.service';
import { BalanceHistoryService } from '@/models/balance/services/balance-history.service';
import { BalanceRepository } from '@/models/balance/repositories/balance.repository';
import { BalanceHistoryRepository } from '@/models/balance/repositories/balance-history.repository';
import { Balance, BalanceSchema } from '@/models/balance/schemas/balance.schema';
import { BalanceHistory, BalanceHistorySchema } from '@/models/balance/schemas/balance-history.schema';
import { Withdrawal, WithdrawalSchema } from '@/models/balance/schemas/withdrawal.schema';
import { WithdrawalService } from '@/models/balance/services/withdrawal.service';
import { WithdrawalRepository } from '@/models/balance/repositories/withdrawal.repository';

@Module({
  controllers: [BalanceController, WithdrawalController],
  providers: [
    BalanceService,
    BalanceHistoryService,
    WithdrawalService,
    BalanceRepository,
    BalanceHistoryRepository,
    WithdrawalRepository,
  ],
  exports: [BalanceService, BalanceHistoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Balance.name, schema: BalanceSchema },
      { name: BalanceHistory.name, schema: BalanceHistorySchema },
      { name: Withdrawal.name, schema: WithdrawalSchema },
    ]),
  ],
})
export class BalanceModule {}
