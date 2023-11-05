import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CheckRolesGuard } from './check-roles.guard';
import { UserRole } from '@/models/user/types/user-roles.interface';

class JwtAccessGuard extends AuthGuard('jwt') {}

export function Auth(roles?: UserRole[]) {
  return applyDecorators(UseGuards(JwtAccessGuard), SetMetadata('roles', roles), UseGuards(CheckRolesGuard));
}