import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Image } from '@/models/image/schemas/image.schema';
import { CreateImage } from '@/models/image/types/create-image.interface';

@Injectable()
export class ImageRepository {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async findById(id: string) {
    return await this.imageModel.findById(id).exec();
  }

  async create(data: CreateImage) {
    return await this.imageModel.create({
      filename: data.filename,
      path: data.filename,
    });
  }
}
