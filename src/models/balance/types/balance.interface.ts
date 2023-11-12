import { TransactionType } from '@/models/balance/types/transaction-type.interface';

export interface UpdateBalance {
  userId: string;
  amount: number;
  type: TransactionType;
}

export interface ChangeBalance extends UpdateBalance {
  userId: string;
  type: TransactionType;
}

export interface CreateBalanceHistory extends UpdateBalance {}
