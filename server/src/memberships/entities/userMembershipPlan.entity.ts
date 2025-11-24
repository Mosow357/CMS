import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";


@Entity("membership_plans")
export class UserMembershipPlan extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column()
  billingPeriod: 'month' | 'year' | 'lifetime';

  @Column({ default: true })
  isActive: boolean;

  @Column()
  quantityOrganizationLimit: number;
}