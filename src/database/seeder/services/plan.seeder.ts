import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Plan } from '@/models/plan/schemas/plan.schema';

@Injectable()
export class PlanSeeder implements OnModuleInit {
  constructor(@InjectModel(Plan.name) private readonly postModel: Model<Plan>) {}

  async onModuleInit() {
    if (await this.isCollectionEmpty()) {
      await this.seedData();
      console.log('Plan collection seeded.');
    }
  }

  private async isCollectionEmpty() {
    return (await this.postModel.countDocuments()) === 0;
  }

  private async seedData() {
    await this.postModel.insertMany([
      {
        name: 'Free',
        description: 'The free subscription plan',
        viewCount: 2,
        price: 0,
      },
      {
        name: 'Basic',
        description: 'The basic subscription plan',
        viewCount: 10,
        price: 100,
      },
      {
        name: 'Standard',
        description: 'The standard subscription plan',
        viewCount: 30,
        price: 200,
      },
      {
        name: 'Premium',
        description: 'The premium subscription plan',
        viewCount: 50,
        price: 300,
      },
      {
        name: 'Ultimate',
        description: 'The ultimate subscription plan',
        viewCount: 100,
        price: 400,
      },
    ]);
  }
}
