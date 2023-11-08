import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BalanceController } from './balance.controller';
import { BalanceService } from './services/balance.service';
import { BalanceHistoryService } from '@/models/balance/services/balance-history.service';
import { BalanceRepository } from '@/models/balance/repositories/balance.repository';
import { BalanceHistoryRepository } from '@/models/balance/repositories/balance-history.repository';
import { Balance, BalanceSchema } from '@/models/balance/schemas/balance.schema';
import { BalanceHistory, BalanceHistorySchema } from '@/models/balance/schemas/balance-history.schema';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, BalanceHistoryService, BalanceRepository, BalanceHistoryRepository],
  exports: [BalanceService, BalanceHistoryService],
  imports: [
    MongooseModule.forFeature([
      { name: Balance.name, schema: BalanceSchema },
      { name: BalanceHistory.name, schema: BalanceHistorySchema },
    ]),
  ],
})
export class BalanceModule {}
