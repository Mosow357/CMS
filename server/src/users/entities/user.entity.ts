import { BaseEntity } from 'src/common/entities/base.entity';
import { UserRole } from 'src/common/types/userRole';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
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

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: UserRole.VISITOR,
  })
  role: UserRole;

  @OneToMany(() => Testimonial, (testimonial) => testimonial.user)
  testimonials: Testimonial[];
}
