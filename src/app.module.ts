import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConfig } from '@/configs/mongo.config';
import { SeederModule } from '@/database/seeder/seeder.module';

import { AuthenticationModule } from '@/authentication/authentication.module';
import { UserModule } from '@/models/user/user.module';
import { PlanModule } from '@/models/plan/plan.module';
import { SubscriptionModule } from '@/models/subscription/subscription.module';
import { BalanceModule } from '@/models/balance/balance.module';
import { ViewModule } from '@/models/view/view.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    SeederModule,

    AuthenticationModule,
    UserModule,
    PlanModule,
    SubscriptionModule,
    BalanceModule,
    ViewModule,
  ],
})
export class AppModule {}
