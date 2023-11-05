import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegistrationUserDto {
  @ApiProperty({ default: 'alex@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ default: 'alex' })
  @IsString()
  username: string;

  @ApiProperty({ default: '123456' })
  @IsString()
  password: string;
}
