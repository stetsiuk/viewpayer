import { Injectable } from '@nestjs/common';

import { PlanRepository } from '@/models/plan/repositories/plan.repository';
import { CreatePlanDto } from '@/models/plan/dto/create-plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  async findAll() {
    return await this.planRepository.findAll();
  }

  async create(dto: CreatePlanDto) {
    return await this.planRepository.create(dto);
  }
}
