import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { SubscriptionRepository } from '@/models/subscription/repositories/subscription.repository';
import { StartSubscriptionData } from '@/models/subscription/types/start-subscription.interface';
import { PlanService } from '@/models/plan/services/plan.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly planService: PlanService,
  ) {}

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

  async startFreeSubscription(userId: string) {
    const freePlan = await this.planService.findFreePlan();
    if (!freePlan) {
      throw new InternalServerErrorException('Free plan is not exist.');
    }
    return await this.subscriptionRepository.create({
      userId,
      planId: freePlan.id,
      status: 'active',
    });
  }

  async startMaximumSubscription(userId: string) {
    const maximumPlan = await this.planService.findMaximumPlan();
    if (!maximumPlan) {
      throw new InternalServerErrorException('There is no plan');
    }
    return await this.subscriptionRepository.create({
      userId,
      planId: maximumPlan.id,
      status: 'active',
    });
  }
}
