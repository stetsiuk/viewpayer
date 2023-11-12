import { SubscriptionStatus } from '@/models/subscription/types/subscription-status.interface';

export interface StartSubscriptionData {
  userId: string;
  planId: string;
  status?: SubscriptionStatus;
}
