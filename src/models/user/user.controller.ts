import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/authentication/guards/auth.guard';
import { UserService } from './services/user.service';
import { GetUserPayload } from '@/authentication/decorators/get-user-payload.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get information about your user',
    description: 'Required: an authorized user',
  })
  @Get()
  @Auth()
  getUser(@GetUserPayload('id') id: string) {
    return this.userService.getUserById(id);
  }
}
