import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(hashPassword: string, userPassword: string) {
    return await compare(hashPassword, userPassword);
  }
}
