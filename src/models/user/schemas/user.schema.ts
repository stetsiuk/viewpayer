import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserRole } from '@/models/user/types/user-roles.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({ example: 'alex' })
  @Prop({ required: true, unique: true })
  username: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: '123456' })
  @Exclude()
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'user' as UserRole })
  @Prop({
    default(): UserRole {
      return 'user';
    },
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
