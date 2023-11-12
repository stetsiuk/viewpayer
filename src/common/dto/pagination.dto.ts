import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiProperty({ required: false, description: 'fieldName_searchedValue' })
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiProperty({ required: false, description: 'fieldName_desc/asc (createdAt_desc is default)' })
  @IsOptional()
  @IsString()
  sort?: string;
}
