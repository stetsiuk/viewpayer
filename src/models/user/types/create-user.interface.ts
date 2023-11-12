import { UserRole } from '@/models/user/types/user-roles.interface';

export interface CreateRegisterUserData {
  phoneNumber: string;
  hashPassword: string;
  referredBy: string;
  role?: UserRole;
}

export interface CreateUserData extends CreateRegisterUserData {
  referralCode: string;
}
