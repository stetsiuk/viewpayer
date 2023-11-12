import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionService } from './services/subscription.service';
import { SubscriptionController } from './subscription.controller';
import { Subscription, SubscriptionSchema } from '@/models/subscription/schemas/subscription.schema';
import { SubscriptionRepository } from '@/models/subscription/repositories/subscription.repository';
import { PlanModule } from '@/models/plan/plan.module';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository],
  exports: [SubscriptionService],
  imports: [MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]), PlanModule],
})
export class SubscriptionModule {}
