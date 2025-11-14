import { BaseEntity } from 'src/common/entities/base.entity';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @OneToMany(() => Testimonial, (testimonial) => testimonial.category)
  testimonials: Testimonial[];
}
