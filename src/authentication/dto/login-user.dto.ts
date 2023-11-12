import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: '+380991416522', description: 'Phone number' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ default: '123456' })
  @IsString()
  password: string;
}
