import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { CreateRegisterUserData } from '@/models/user/types/create-user.interface';
import { BalanceService } from '@/models/balance/services/balance.service';
import { SubscriptionService } from '@/models/subscription/services/subscription.service';
import { ReferralService } from '@/models/user/services/referral.service';
import { SubscriptionDocument } from '@/models/subscription/schemas/subscription.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly balanceService: BalanceService,
    private readonly subscriptionService: SubscriptionService,
    @Inject(forwardRef(() => ReferralService))
    private readonly referralService: ReferralService,
  ) {}

  async findUserByReferralCode(referralCode: string) {
    return await this.userRepository.findUserByReferralCode(referralCode);
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async getUserByPhoneNumber(phoneNumber: string) {
    return this.userRepository.getUserByPhoneNumber(phoneNumber);
  }

  async getUserByReferralCode(referralCode: string) {
    return await this.userRepository.getUserByReferralCode(referralCode);
  }

  async registerUser(data: CreateRegisterUserData) {
    const referralCode = await this.referralService.generateUniqueReferralCode();

    const user = await this.userRepository.createUser({
      phoneNumber: data.phoneNumber,
      hashPassword: data.hashPassword,
      referredBy: data.referredBy,
      role: data.role,
      referralCode,
    });

    const balance = await this.balanceService.create(user.id);

    let subscription: SubscriptionDocument;

    if (data.role === 'admin') {
      subscription = await this.subscriptionService.startMaximumSubscription(user.id);
    } else {
      subscription = await this.subscriptionService.startFreeSubscription(user.id);
    }

    user.balance = balance.id;
    user.subscription = subscription.id;

    await user.save();

    return user;
  }
}
