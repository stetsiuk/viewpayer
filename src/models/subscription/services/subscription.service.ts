import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { SubscriptionRepository } from '@/models/subscription/repositories/subscription.repository';
import { StartSubscriptionData } from '@/models/subscription/types/start-subscription.interface';
import { PlanService } from '@/models/plan/services/plan.service';
import { ImageService } from '@/models/image/services/image.service';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly planService: PlanService,
    private readonly imageService: ImageService,
  ) {}

  async getUserSubscription(userId: string) {
    return await this.subscriptionRepository.findByUserId(userId);
  }

  async getUserSubscriptionWithPlan(userId: string) {
    return await this.subscriptionRepository.findWithPlanByUserId(userId);
  }

  async startSubscription(data: StartSubscriptionData) {
    const oldSubscription = await this.getUserSubscriptionWithPlan(data.userId);
    if (oldSubscription && oldSubscription.plan.type === 'paid') {
      throw new MethodNotAllowedException('The user has a subscription');
    }
    const plan = await this.planService.findById(data.planId);
    if (!plan) {
      throw new BadRequestException('Plan is not exist.');
    }
    const image = await this.imageService.create({
      filename: data.screenshot.filename,
      path: data.screenshot.path,
    });
    const newSubscription = await this.subscriptionRepository.create({
      userId: data.userId,
      planId: data.planId,
      paymentScreenshot: image.id,
      status: 'waiting',
      isPaid: plan.type === 'paid',
    });

    if (oldSubscription) {
      oldSubscription.status = 'disabled';
      oldSubscription.endDate = new Date();
      await oldSubscription.save();
    }
    return newSubscription;
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
      isPaid: freePlan.type === 'paid',
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
      isPaid: maximumPlan.type === 'paid',
    });
  }

  async cancelSubscription(userId: string) {
    const subscription = await this.getUserSubscription(userId);
    if (!subscription) {
      throw new BadRequestException('The user has no subscription');
    }
    if (subscription.status === 'canceled') {
      throw new BadRequestException('This subscription has already been canceled');
    }
    subscription.status = 'canceled';
    return await subscription.save();
  }
}
