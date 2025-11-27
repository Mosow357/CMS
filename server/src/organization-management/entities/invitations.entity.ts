import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity('invitations')
export class Invitations extends BaseEntity {
    @Column()
    user_id:string;

    @Column()
    organizationId: string;
    
    @Column()
    role_asigned: string;

    @Column()
    token_hashed: string;

    @Column()
    expires_at: Date;

    @Column()
    used_at: Date | null;
}