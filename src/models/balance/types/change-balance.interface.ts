import { TransactionType } from '@/models/balance/types/transaction-type.interface';

export interface ChangeBalanceData {
  userId: string;
  amount: number;
  type: TransactionType;
}
