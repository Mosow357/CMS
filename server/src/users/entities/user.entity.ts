import { BaseEntity } from 'src/common/entities/base.entity';
import { Organitation } from 'src/organitations/entities/organitation.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false,select:false })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Organitation, (Organitation) => Organitation.members)
  organitation: Organitation[];
}
