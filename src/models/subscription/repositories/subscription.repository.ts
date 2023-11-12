import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subscription } from '@/models/subscription/schemas/subscription.schema';
import { StartSubscriptionData } from '@/models/subscription/types/start-subscription.interface';
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

  async create(data: StartSubscriptionData) {
    return await this.subscriptionModel.create({
      user: data.userId,
      plan: data.planId,
      status: data.status,
    });
  }

  async delete(userId: string) {
    return await this.subscriptionModel.findOneAndDelete({ userId }).exec();
  }
}
