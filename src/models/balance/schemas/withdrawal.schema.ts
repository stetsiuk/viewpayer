import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { WithdrawalStatus } from '@/models/balance/types/withdrawal-status.interface';
import { BalanceHistory } from '@/models/balance/schemas/balance-history.schema';

export type WithdrawalDocument = HydratedDocument<Withdrawal>;

@Schema({ timestamps: true, versionKey: false })
export class Withdrawal {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: BalanceHistory.name, required: true })
  balanceHistory: BalanceHistory;

  @Prop({ enum: WithdrawalStatus, required: true })
  status: WithdrawalStatus;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  bankCard: string;

  @Prop({ required: true })
  amount: number;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);
