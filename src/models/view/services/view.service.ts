import { ForbiddenException, Injectable } from '@nestjs/common';

import { ViewRepository } from '@/models/view/repositories/view.repository';
import { ViewVideoData } from '@/models/view/types/view-video.interface';
import { SubscriptionService } from '@/models/subscription/services/subscription.service';
import { BalanceHistoryService } from '@/models/balance/services/balance-history.service';

@Injectable()
export class ViewService {
  constructor(
    private readonly viewRepository: ViewRepository,
    private readonly balanceHistoryService: BalanceHistoryService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async getViewsForCurrentDay(userId: string) {
    return await this.viewRepository.findAllForCurrentDay(userId);
  }

  async viewVideo(data: ViewVideoData) {
    const subscription = await this.subscriptionService.getUserSubscriptionWithPlan(data.userId);
    if (!subscription || subscription.status === 'waiting') {
      throw new ForbiddenException('The user does not have an active subscription');
    }
    const lastViewsForDay = await this.getViewsForCurrentDay(data.userId);
    if (lastViewsForDay.length >= subscription.plan.viewCount) {
      throw new ForbiddenException('The view limit has been reached');
    }
    const newBalanceHistory = await this.balanceHistoryService.changeBalance({
      userId: data.userId,
      amount: 10,
      type: 'viewing',
    });
    await this.viewRepository.create({
      userId: data.userId,
      videoUrl: data.videoUrl,
      balanceHistoryId: newBalanceHistory.id,
    });
  }
}
