import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { PlanType } from '@/models/plan/types/plan-type.interface';

export class CreatePlanDto {
  @ApiProperty({ default: 'Basic' })
  @IsString()
  name: string;

  @ApiProperty({ enum: PlanType })
  @IsEnum(PlanType)
  type: PlanType;

  @ApiProperty({ default: 'The basic plan' })
  @IsString()
  description: string;

  @ApiProperty({ default: 50 })
  @IsNumber()
  price: number;

  @ApiProperty({ default: 20 })
  @IsNumber()
  viewCount: number;
}
