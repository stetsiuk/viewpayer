import { BadRequestException, Injectable, MethodNotAllowedException } from '@nestjs/common';
import { SubscriptionRepository } from '@/models/subscription/repositories/subscription.repository';
import { StartSubscriptionData } from '@/models/subscription/types/start-subscription.interface';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async getUserSubscription(userId: string) {
    return {
      subscription: await this.subscriptionRepository.findByUserId(userId),
    };
  }

  async startSubscription(data: StartSubscriptionData) {
    const { subscription } = await this.getUserSubscription(data.userId);
    if (subscription) {
      throw new MethodNotAllowedException('The user has a subscription');
    }
    return await this.subscriptionRepository.create(data);
  }

  async cancelSubscription(userId: string) {
    const deletedSubscription = await this.subscriptionRepository.delete(userId);
    if (!deletedSubscription) {
      throw new BadRequestException('The user has no subscription');
    }
  }

  async getUserSubscriptionWithPlan(userId: string) {
    return await this.subscriptionRepository.findWithPlanByUserId(userId);
  }
}
