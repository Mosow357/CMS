import { BaseEntity } from 'src/common/entities/base.entity';
import { UserOrganization } from 'src/user_organization/entities/userOrganization.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean', default: false })
  email_confirmed: boolean;

  @OneToMany(() => UserOrganization, userOrg => userOrg.user)
  userOrganizations: UserOrganization[];
}
