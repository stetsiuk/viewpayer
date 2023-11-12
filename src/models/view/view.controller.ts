import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ViewService } from '@/models/view/services/view.service';
import { ViewVideoDto } from '@/models/view/dto/view-video.dto';
import { Auth } from '@/authentication/guards/auth.guard';
import { GetUserPayload } from '@/authentication/decorators/get-user-payload.decorator';
import { RESPONSE_MESSAGE } from '@/common/messages';

@ApiTags('View')
@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @ApiOperation({
    summary: 'View video',
    description: 'Required: an authorized user with a active subscription and unused views for the current day',
    security: [{ cookieAuth: [] }],
  })
  @Post()
  @Auth()
  async viewVideo(@GetUserPayload('id') userId: string, @Body() { videoUrl }: ViewVideoDto) {
    await this.viewService.viewVideo({ userId, videoUrl });
    return RESPONSE_MESSAGE.SUCCESSFUL;
  }
}
