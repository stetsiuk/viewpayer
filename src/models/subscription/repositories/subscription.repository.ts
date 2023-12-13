import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subscription } from '@/models/subscription/schemas/subscription.schema';
import { CreateSubscription } from '@/models/subscription/types/start-subscription.interface';
import { Plan } from '@/models/plan/schemas/plan.schema';

@Injectable()
export class SubscriptionRepository {
  constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>) {}

  async findByUserId(userId: string) {
    return await this.subscriptionModel.findOne({ user: userId }).exec();
  }

  async findWithPlanByUserId(userId: string) {
    return await this.subscriptionModel.findOne({ user: userId }).populate<Plan>('plan').exec();
  }

  async create(data: CreateSubscription) {
    const startDate = new Date();
    let endDate: Date | null = null;

    if (data.isPaid) {
      endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 3);
    }

    return await this.subscriptionModel.create({
      user: data.userId,
      plan: data.planId,
      status: data.status,
      startDate,
      endDate,
    });
  }

  async cancel(userId: string) {
    const sub = await this.subscriptionModel.findOne({ user: userId }).exec();
    if (sub) {
      throw new BadRequestException('The user has no subscription');
    }
    sub.status = 'canceled';
    return await sub.save();
  }
}
