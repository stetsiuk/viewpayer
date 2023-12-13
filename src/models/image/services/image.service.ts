import { Injectable } from '@nestjs/common';
import { ImageRepository } from '@/models/image/repositories/image.repository';
import { CreateImage } from '@/models/image/types/create-image.interface';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async findById(id: string) {
    return await this.imageRepository.findById(id);
  }

  async create(data: CreateImage) {
    return await this.imageRepository.create(data);
  }
}
