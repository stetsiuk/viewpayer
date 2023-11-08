import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ViewVideoDto {
  @ApiProperty({ default: 'https://www.youtube.com/watch?v=QKdZYT8iTxc' })
  @IsString()
  videoUrl: string;
}
