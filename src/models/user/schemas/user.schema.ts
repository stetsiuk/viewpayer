import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { UserRole } from '@/models/user/types/user-roles.interface';
import { Subscription } from '@/models/subscription/schemas/subscription.schema';
import { Balance } from '@/models/balance/schemas/balance.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({ example: '+380991416522' })
  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @ApiProperty({ example: '123456' })
  @Exclude()
  @Prop({ required: true })
  hashPassword: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @Prop({
    unique: true,
    sparse: true,
  })
  email: string;

  @ApiProperty({ example: 'user' as UserRole })
  @Prop({
    default(): UserRole {
      return 'user';
    },
  })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: Balance.name })
  balance: Balance;

  @Prop({ type: Types.ObjectId, ref: Subscription.name })
  subscription: Subscription;

  @Prop({ required: true, unique: true })
  referralCode: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  referredBy: User;
}

export const UserSchema = SchemaFactory.createForClass(User);
