import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JwtTokenPayload } from '@/authentication/types/jwt-token-payload.interface';

export const GetUserPayload = createParamDecorator((data: keyof JwtTokenPayload, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const user: JwtTokenPayload = request.user;

  return data ? user?.[data] : user;
});
