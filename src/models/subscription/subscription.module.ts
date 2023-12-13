import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionService } from './services/subscription.service';
import { SubscriptionCron } from '@/models/subscription/services/subscription.cron';
import { SubscriptionController } from './subscription.controller';
import { Subscription, SubscriptionSchema } from '@/models/subscription/schemas/subscription.schema';
import { SubscriptionRepository } from '@/models/subscription/repositories/subscription.repository';
import { PlanModule } from '@/models/plan/plan.module';
import { ImageModule } from '@/models/image/image.module';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, SubscriptionCron],
  exports: [SubscriptionService],
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
    PlanModule,
    ImageModule,
  ],
})
export class SubscriptionModule {}
