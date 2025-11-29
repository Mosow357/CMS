import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InviteUserToOrganizationDto {
    @ApiProperty({
        description: 'Email (or username if supported) of the user who will receive the invitation.',
        example: 'john.doe@example.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Unique identifier of the organization the user is being invited to. Must exist in the system.',
        example: 'b72ce18d-1c62-4df7-9c55-43c29b5dc1f4'
    })
    @IsString()
    @IsNotEmpty()
    organizationId: string;

    @ApiProperty({
        description: 'Role that will be assigned to the invited user within the organization. If omitted, a default role may be applied (EDITOR).',
        required: false,
        example: 'EDITOR'
    })
    @IsString()
    @IsOptional()
    role?: string;
}