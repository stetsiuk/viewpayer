import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { BalanceHistory } from '@/models/balance/schemas/balance-history.schema';

export type ViewDocument = HydratedDocument<View>;

@Schema({ timestamps: true, versionKey: false })
export class View {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: BalanceHistory.name, required: true })
  balanceHistoryId: BalanceHistory;

  @Prop({ required: true })
  videoUrl: string;
}

export const ViewSchema = SchemaFactory.createForClass(View);
