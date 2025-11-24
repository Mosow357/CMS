import { BaseEntity, Column, Entity, ManyToOne, Or } from "typeorm";
import { OrganizationPlan } from "./organizationPlan.entity";
import { Organization } from "src/organizations/entities/organization.entity";

@Entity()
export class OrganizationSubscription extends BaseEntity {
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

    @ManyToOne(() => OrganizationPlan)
    plan: OrganizationPlan;

    @ManyToOne(() => Organization)
    user: Organization;
}