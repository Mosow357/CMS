import { BaseEntity } from "src/common/entities/base.entity";
import { OrganizationRole } from "src/common/types/userRole";
import { Column, Entity, Index } from "typeorm";

@Entity('invitations')
export class Invitation extends BaseEntity {
    @Column()
    user_id: string;

    @Column()
    organizationId: string;

    @Column()
    role_asigned: OrganizationRole;

    @Index()
    @Column()
    token_hashed: string;

    @Column()
    expires_at: Date;

    @Column({ type: 'datetime', nullable: true })
    used_at: Date | null;

}