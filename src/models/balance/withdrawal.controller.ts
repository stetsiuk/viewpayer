import { Body, Controller, Get, HttpCode, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { WithdrawalService } from '@/models/balance/services/withdrawal.service';
import { PaginationQueryDto } from '@/common/dto/pagination.dto';
import { MongoIdValidationPipe } from '@/common/pipes/mongo-id-validation.pipe';
import { UpdateWithdrawalDto } from '@/models/balance/dto/update-withdrawal.dto';
import { WithdrawalStatus } from '@/models/balance/types/withdrawal-status.interface';

@Controller('withdrawal')
@ApiTags('Withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @ApiOperation({
    summary: 'Receive withdrawals from all users accounts',
    description: 'Required: authorized admin',
  })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Get()
  @Auth(['admin'])
  async getWithdraws(@Query() query: PaginationQueryDto) {
    return await this.withdrawalService.findAllWithdrawals(query);
  }

  @ApiOperation({
    summary: 'Update withdrawal by id',
    description: 'Required: authorized admin',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 400,
    description: `Invalid id format / Status must be one of the following values: 
                  ${Object.values(WithdrawalStatus).join(', ')}`,
  })
  @Patch(':id')
  @Auth(['admin'])
  async updateWithdraw(@Param('id', MongoIdValidationPipe) id: string, @Body() dto: UpdateWithdrawalDto) {
    return await this.withdrawalService.updateOne(id, dto);
  }
}
