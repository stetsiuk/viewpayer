import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ViewVideoCreate } from '@/models/view/types/view-video.interface';
import { View } from '@/models/view/schemas/view.schema';

@Injectable()
export class ViewRepository {
  constructor(@InjectModel(View.name) private viewModel: Model<View>) {}

  async findAllForCurrentDay(userId: string) {
    return await this.viewModel.find({ userId, createdAt: { $gte: new Date().toDateString() } }).exec();
  }

  async create(data: ViewVideoCreate) {
    const newView = await this.viewModel.create({
      userId: data.userId,
      balanceHistoryId: data.balanceHistoryId,
      videoUrl: data.videoUrl,
    });
    return newView.save();
  }
}
