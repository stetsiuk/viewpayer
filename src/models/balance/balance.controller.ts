import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { GetUserPayload } from '@/authentication/decorators/get-user-payload.decorator';
import { BalanceHistoryService } from '@/models/balance/services/balance-history.service';
import { BalanceService } from '@/models/balance/services/balance.service';
import { CreateWithdrawalDto } from '@/models/balance/dto/create-withdrawal.dto';
import { WithdrawalService } from '@/models/balance/services/withdrawal.service';
import { RESPONSE_MESSAGE } from '@/common/messages';
import { SuccessDto } from '@/common/dto/success.dto';

@Controller('balance')
@ApiTags('Balance')
export class BalanceController {
  constructor(
    private readonly balanceService: BalanceService,
    private readonly balanceHistoryService: BalanceHistoryService,
    private readonly withdrawalService: WithdrawalService,
  ) {}

  @ApiOperation({
    summary: 'Get current user balance',
    description: 'Required: an authorized user',
  })
  @Get()
  @Auth()
  getBalance(@GetUserPayload('id') userId: string) {
    return this.balanceService.findOne(userId);
  }

  @ApiOperation({
    summary: 'Get current user balance history',
    description: 'Required: an authorized user',
  })
  @Get('history')
  @Auth()
  getBalanceHistory(@GetUserPayload('id') userId: string) {
    return this.balanceHistoryService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Withdraw funds from the account',
    description: 'Required: an authorized user',
  })
  @ApiResponse({ status: 201, type: SuccessDto })
  @ApiResponse({ status: 405, description: 'Not have enough funds' })
  @HttpCode(201)
  @Post('withdraw')
  @Auth()
  async createWithdraw(@GetUserPayload('id') userId: string, @Body() dto: CreateWithdrawalDto) {
    await this.withdrawalService.create({ userId, ...dto });
    return RESPONSE_MESSAGE.SUCCESSFUL;
  }
}
