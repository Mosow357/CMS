import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/userRole';

export const ROLES_KEY = 'roles';
export const RolesG = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
