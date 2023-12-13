import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ timestamps: { createdAt: true, updatedAt: false }, versionKey: false })
export class Image {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
