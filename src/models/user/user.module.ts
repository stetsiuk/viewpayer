import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from '@/models/user/repositories/user.repository';
import { ReferralService } from '@/models/user/services/referral.service';
import { User, UserSchema } from '@/models/user/schemas/user.schema';
import { BalanceModule } from '@/models/balance/balance.module';
import { SubscriptionModule } from '@/models/subscription/subscription.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, ReferralService],
  exports: [UserService, ReferralService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), BalanceModule, SubscriptionModule],
})
export class UserModule {}
