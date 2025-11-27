import { OrganizationRole } from "src/common/types/userRole";

export interface JoinUserToOrganizationDto {
  userId: string;
  organizationId: string;
  role?: OrganizationRole;
}