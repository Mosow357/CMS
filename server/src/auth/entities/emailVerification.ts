import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity("email_verifications")
export class EmailVerification extends BaseEntity {
    @Column()
    email: string;
    @Index()
    @Column()
    token: string;
    @Column()
    expiresAt: Date;
    @Column({ default: null, nullable: true })
    usedAt: Date;
}