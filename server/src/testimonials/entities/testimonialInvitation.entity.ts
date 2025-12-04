import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index } from "typeorm";


@Entity('testimonial_invitations')
export class TestimonialInvitation extends BaseEntity {
    @Column({ type: 'varchar', nullable: false })
    email: string;
    
    @Index()
    @Column({ type: 'varchar', nullable: false })
    token: string;

    @Column()
    expires_at: Date;

    @Column({ type: 'datetime', nullable: true })
    used_at: Date | null;
}