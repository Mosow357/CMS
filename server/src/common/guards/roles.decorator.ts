import { SetMetadata } from '@nestjs/common';
import { OrganizationRole } from '../types/userRole';

export const ROLES_KEY = 'roles';
export const RolesG = (...roles: OrganizationRole[]) => SetMetadata(ROLES_KEY, roles);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
