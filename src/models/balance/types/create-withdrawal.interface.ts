import { CreateWithdrawalDto } from '@/models/balance/dto/create-withdrawal.dto';

export interface CreateWithdrawalData extends CreateWithdrawalDto {
  userId: string;
}

export interface CreateWithdrawal extends CreateWithdrawalData {
  balanceHistory: string;
}
