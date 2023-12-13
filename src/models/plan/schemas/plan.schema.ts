import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { PlanType } from '@/models/plan/types/plan-type.interface';

export type PlanDocument = HydratedDocument<Plan>;

@Schema({ timestamps: true, versionKey: false })
export class Plan {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: String, enum: PlanType })
  type: PlanType;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  viewCount: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
