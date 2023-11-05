import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ default: 'alex', description: 'Username or Email' })
  @IsString()
  login: string;

  @ApiProperty({ default: '123456' })
  @IsString()
  password: string;
}
