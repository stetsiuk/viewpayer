import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { Plan } from '@/models/plan/schemas/plan.schema';
import { SubscriptionStatus } from '@/models/subscription/types/subscription-status.interface';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: { createdAt: true }, versionKey: false })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: Plan.name, required: true })
  plan: Plan;

  @Prop({
    default(): SubscriptionStatus {
      return 'waiting';
    },
  })
  status: SubscriptionStatus;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
