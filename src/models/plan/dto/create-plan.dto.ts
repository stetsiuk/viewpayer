import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ default: 'Basic' })
  @IsString()
  name: string;

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
