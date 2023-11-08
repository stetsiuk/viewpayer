import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { GetUserPayload } from '@/authentication/decorators/get-user-payload.decorator';
import { BalanceHistoryService } from '@/models/balance/services/balance-history.service';
import { BalanceService } from '@/models/balance/services/balance.service';

@Controller('balance')
@ApiTags('Balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly balanceHistoryService: BalanceHistoryService,
  ) {}

  @ApiOperation({ summary: 'Get current user balance' })
  @Get()
  @Auth()
  getBalance(@GetUserPayload('id') userId: string) {
    return this.balanceService.findOne(userId);
  }

  @ApiOperation({ summary: 'Get current user balance history' })
  @Get('history')
  @Auth()
  getBalanceHistory(@GetUserPayload('id') userId: string) {
    return this.balanceHistoryService.findAll(userId);
  }
}
