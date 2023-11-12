import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlanController } from '@/models/plan/plan.controller';
import { PlanService } from '@/models/plan/services/plan.service';
import { Plan, PlanSchema } from '@/models/plan/schemas/plan.schema';
import { PlanRepository } from '@/models/plan/repositories/plan.repository';

@Module({
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
  exports: [PlanService],
  imports: [MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }])],
})
export class PlanModule {}
