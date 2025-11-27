
export interface InviteUserToOrganizationDto {
    email: string;
    organizationId: string;
    role?: string;
}