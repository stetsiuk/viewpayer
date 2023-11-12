import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '@/models/user/services/user.service';

@Injectable()
export class ReferralService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async generateUniqueReferralCode(): Promise<string> {
    let isUnique = false;
    let referralCode: string;

    while (!isUnique) {
      referralCode = uuidv4().slice(0, 8);
      const existingUser = await this.userService.findUserByReferralCode(referralCode);

      if (!existingUser) {
        isUnique = true;
      }
    }

    return referralCode;
  }
}
