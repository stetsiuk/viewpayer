import { SubscriptionStatus } from '@/models/subscription/types/subscription-status.interface';

export interface CreateSubscription {
  userId: string;
  planId: string;
  paymentScreenshot?: string;
  status?: SubscriptionStatus;
  isPaid: boolean;
}

export interface StartSubscriptionData extends Omit<CreateSubscription, 'status' | 'isPaid' | 'paymentScreenshot'> {
  screenshot: Express.Multer.File;
}
