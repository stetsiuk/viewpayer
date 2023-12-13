import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageService } from './services/image.service';
import { ImageRepository } from '@/models/image/repositories/image.repository';
import { ImageSchema, Image } from '@/models/image/schemas/image.schema';

@Module({
  providers: [ImageService, ImageRepository],
  exports: [ImageService],
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],
})
export class ImageModule {}
