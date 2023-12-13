import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { Auth } from '@/authentication/guards/auth.guard';
import { ApiFile } from '@/common/decorator/api-file.decorator';
import { SubscriptionService } from '@/models/subscription/services/subscription.service';
import { CreateSubscriptionDto } from '@/models/subscription/dto/create-subscription.dto';
import { GetUserPayload } from '@/authentication/decorators/get-user-payload.decorator';
import { RESPONSE_MESSAGE } from '@/common/messages';

@Controller('subscription')
@ApiTags('Subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({
    summary: 'Start new subscription',
    description: 'Required: an authorized user',
  })
  @Post('start')
  @Auth()
  @ApiFile('screenshot', {
    storage: diskStorage({
      destination: './upload/payment-screenshots/',
      filename(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`;
        cb(null, fileName);
      },
    }),
  })
  async startSubscription(
    @GetUserPayload('id') userId: string,
    @Body() dto: CreateSubscriptionDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /image.(jpg|jpeg|png)$/ }),
          new MaxFileSizeValidator({ maxSize: 5000000 }),
        ],
      }),
    )
    screenshot: Express.Multer.File,
  ) {
    await this.subscriptionService.startSubscription({ userId, planId: dto.planId, screenshot });
    return RESPONSE_MESSAGE.SUCCESSFUL;
  }

  @ApiOperation({
    summary: 'Cancel your current subscription',
    description: 'Required: an authorized user',
  })
  @Delete('cancel')
  @Auth()
  async cancelSubscription(@GetUserPayload('id') userId: string) {
    await this.subscriptionService.cancelSubscription(userId);
    return RESPONSE_MESSAGE.SUCCESSFUL;
  }
}
