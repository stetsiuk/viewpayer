import { Injectable } from '@nestjs/common';

import { SubscriptionService } from '@/models/subscription/services/subscription.service';

@Injectable()
export class SubscriptionCron {
  constructor(private readonly subscriptionService: SubscriptionService) {}
}
