import { Organization } from "src/organizations/entities/organization.entity";
import { UserOrganization } from "src/user_organization/entities/userOrganization.entity";


export type RequestUser = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  name: string;
  token: string;
  tokenExpiredAt: Date;
  userOrganizations: UserOrganization[]
};
