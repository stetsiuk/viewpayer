import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';

export type BalanceDocument = HydratedDocument<Balance>;

@Schema({ timestamps: true, versionKey: false })
export class Balance {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({
    default() {
      return 0;
    },
  })
  balance: number;

  @Prop({
    default() {
      return 0;
    },
  })
  withdrawal: number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
