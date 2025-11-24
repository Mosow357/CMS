import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserMembershipPlan } from "./userMembershipPlan.entity";
import { User } from "src/users/entities/user.entity";

@Entity('user_memberships')
export class UserMembership extends BaseEntity {
    @Column()
    organizationId: string;

    @Column()
    planId: string;

    @Column()
    invoiceId: string;

    @Column()
    expirationDate: Date;

    @Column()
    startDate: Date;

    @ManyToOne(() => UserMembershipPlan)
    plan: UserMembershipPlan;

    @ManyToOne(() => User)
    user: User;
}