import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { WithdrawalStatus } from '@/models/balance/types/withdrawal-status.interface';

export class UpdateWithdrawalDto {
  @ApiProperty({ enum: WithdrawalStatus, default: WithdrawalStatus.Success })
  @IsEnum(WithdrawalStatus)
  status: WithdrawalStatus;

  @ApiPropertyOptional({ default: 'The withdrawal operation was successful' })
  @IsOptional()
  @IsString()
  description: string;
}
