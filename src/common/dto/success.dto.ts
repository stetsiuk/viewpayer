import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_MESSAGE } from '@/common/messages';

export class SuccessDto {
  @ApiProperty({ example: 'success' as typeof RESPONSE_MESSAGE.SUCCESSFUL.status })
  status: string;
}
