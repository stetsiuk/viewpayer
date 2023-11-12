import { IsCreditCard, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawalDto {
  @ApiProperty({ default: 'Valentyn' })
  @IsString()
  ownerName: string;

  @ApiProperty({ default: '4149629300938412' })
  @IsCreditCard()
  @IsString()
  bankCard: string;

  @ApiProperty({ default: 500000 })
  @Min(500000)
  @IsNumber()
  amount: number;
}
