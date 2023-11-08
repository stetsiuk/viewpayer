import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { PlanService } from '@/models/plan/services/plan.service';
import { CreatePlanDto } from '@/models/plan/dto/create-plan.dto';

@Controller('plan')
@ApiTags('Plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  async getPlans() {
    return await this.planService.findAll();
  }

  @Post()
  @Auth(['admin'])
  async createPlan(@Body() dto: CreatePlanDto) {
    return await this.planService.create(dto);
  }
}
