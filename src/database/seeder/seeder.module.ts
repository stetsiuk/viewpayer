import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from '@/authentication/authentication.module';
import { UserModule } from '@/models/user/user.module';

import { Plan, PlanSchema } from '@/models/plan/schemas/plan.schema';
import { User, UserSchema } from '@/models/user/schemas/user.schema';

import { UserSeeder } from '@/database/seeder/services/user.seeder';
import { PlanSeeder } from '@/database/seeder/services/plan.seeder';

@Module({
  providers: [PlanSeeder, UserSeeder],
  imports: [
    MongooseModule.forFeature([
      { name: Plan.name, schema: PlanSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UserModule,
    AuthenticationModule,
  ],
})
export class SeederModule {}
