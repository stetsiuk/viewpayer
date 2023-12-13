import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/models/user/schemas/user.schema';
import { Plan } from '@/models/plan/schemas/plan.schema';
import { SubscriptionStatus } from '@/models/subscription/types/subscription-status.interface';
import { Image } from '@/models/image/schemas/image.schema';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: { createdAt: true, updatedAt: false }, versionKey: false })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: Plan.name, required: true })
  plan: Plan;

  @Prop({ type: Types.ObjectId, ref: Image.name })
  paymentScreenshot: Image;

  @Prop({
    default(): SubscriptionStatus {
      return 'waiting';
    },
  })
  status: SubscriptionStatus;

  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
