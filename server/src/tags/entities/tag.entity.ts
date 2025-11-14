import { BaseEntity } from 'src/common/entities/base.entity';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import {
  Entity,
  Column,
  ManyToMany,
} from 'typeorm';

@Entity('tags')
export class Tag extends BaseEntity {

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToMany(() => Testimonial, (testimonial) => testimonial.tags)
  testimonials: Testimonial[];
}
