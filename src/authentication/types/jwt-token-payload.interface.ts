import { UserRole } from '@/models/user/types/user-roles.interface';

export interface JwtTokenPayload {
  id: string;
  role: UserRole;
}
