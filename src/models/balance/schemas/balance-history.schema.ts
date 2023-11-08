import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { TransactionType } from '@/models/balance/types/transaction-type.interface';

export type BalanceHistoryDocument = HydratedDocument<BalanceHistory>;

@Schema({ timestamps: { createdAt: true }, versionKey: false })
export class BalanceHistory {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: User;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: TransactionType;
}

export const BalanceHistorySchema = SchemaFactory.createForClass(BalanceHistory);
