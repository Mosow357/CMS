import { BaseEntity } from "src/common/entities/base.entity";
import { Organization } from "src/organizations/entities/organization.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity('user_organization')
export class UserOrganization extends BaseEntity {
    @Column()
    userId: string;

    @Column()
    organizationId: string;

    @Column()
    role: string;

     @ManyToOne(() => User, user => user.userOrganizations)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Organization, org => org.userOrganizations)
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;
}