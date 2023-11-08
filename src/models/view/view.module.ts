import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ViewController } from './view.controller';
import { ViewService } from './services/view.service';
import { View, ViewSchema } from '@/models/view/schemas/view.schema';
import { ViewRepository } from '@/models/view/repositories/view.repository';
import { SubscriptionModule } from '@/models/subscription/subscription.module';
import { BalanceModule } from '@/models/balance/balance.module';

@Module({
  controllers: [ViewController],
  providers: [ViewService, ViewRepository],
  imports: [MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }]), SubscriptionModule, BalanceModule],
})
export class ViewModule {}
