import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegistrationUserDto {
  @ApiProperty({ default: '+380991416522' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ default: '123456' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ default: '' })
  @IsString()
  referralCode?: string;
}
