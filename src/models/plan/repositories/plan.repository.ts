import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Plan } from '@/models/plan/schemas/plan.schema';
import { CreatePlanDto } from '@/models/plan/dto/create-plan.dto';

@Injectable()
export class PlanRepository {
  constructor(@InjectModel(Plan.name) private planModel: Model<Plan>) {}

  async findAll() {
    return await this.planModel.find().exec();
  }

  async create(dto: CreatePlanDto) {
    const newPlan = await this.planModel.create(dto);
    return newPlan.save();
  }

  async findFreePlan() {
    return await this.planModel.findOne({ price: 0 }).exec();
  }

  async findMaximumPlan() {
    return await this.planModel.findOne().sort('-viewCount').exec();
  }
}
