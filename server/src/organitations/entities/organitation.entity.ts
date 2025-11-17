import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('organitations')
export class Organitation extends BaseEntity {

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => User, (User) => User.organitation)
  members: User[];
}
