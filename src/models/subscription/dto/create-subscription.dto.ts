import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsString()
  planId: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Screenshot of payment. Formats: jpg, jpeg, png. Max size - 5mb',
    required: true,
  })
  screenshot: Express.Multer.File;
}
