// import { CanActivate, ExecutionContext, UseGuards, applyDecorators, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
//
// @Injectable()
// export class NoAuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     // console.log(this.jwtService, '1');
//     const request = context.switchToHttp().getRequest();
//     const what = await this.jwtService.verifyAsync(request.cookies.token);
//     console.log({ what });
//     console.log('isAuth', request.isAuthenticated);
//     console.log('user', request.user);
//     console.log('cookies', request.cookies);
//
//     return false;
//   }
// }
//
// export function NoAuth() {
//   return applyDecorators(UseGuards(NoAuthGuard));
// }
export {};
