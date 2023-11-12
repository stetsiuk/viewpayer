import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { PlanService } from '@/models/plan/services/plan.service';
import { CreatePlanDto } from '@/models/plan/dto/create-plan.dto';

@Controller('plan')
@ApiTags('Plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Get a list of plans' })
  @Get()
  async getPlans() {
    return await this.planService.findAll();
  }

  @ApiOperation({
    summary: 'Create a new plan',
    description: 'Required: authorized admin',
  })
  @Post()
  @Auth(['admin'])
  async createPlan(@Body() dto: CreatePlanDto) {
    return await this.planService.create(dto);
  }
}
