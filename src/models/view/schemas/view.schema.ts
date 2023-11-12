import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { BalanceHistory } from '@/models/balance/schemas/balance-history.schema';

export type ViewDocument = HydratedDocument<View>;

@Schema({ timestamps: { createdAt: true }, versionKey: false })
export class View {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: BalanceHistory.name, required: true })
  balanceHistory: BalanceHistory;

  @Prop({ required: true })
  videoUrl: string;
}

export const ViewSchema = SchemaFactory.createForClass(View);
