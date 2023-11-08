import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from '@/models/user/repositories/user.repository';
import { User, UserSchema } from '@/models/user/schemas/user.schema';
import { BalanceModule } from '@/models/balance/balance.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), BalanceModule],
})
export class UserModule {}
