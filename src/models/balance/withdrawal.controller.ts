import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { WithdrawalService } from '@/models/balance/services/withdrawal.service';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';

@Controller('withdrawal')
@ApiTags('Withdrawal')
@ApiCookieAuth()
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @ApiOperation({
    summary: 'Receive withdrawals from all users accounts',
    description: 'Required: authorized admin',
    security: [{ cookieAuth: [] }],
  })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Get('withdraw')
  @Auth(['admin'])
  async getWithdraws(@Query() query: PaginationQueryDto) {
    return await this.withdrawalService.findAllWithdrawals(query);
  }
}
