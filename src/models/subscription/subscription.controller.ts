import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
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
  async startSubscription(@GetUserPayload('id') userId: string, @Body() dto: CreateSubscriptionDto) {
    await this.subscriptionService.startSubscription({ userId, planId: dto.planId });
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
