import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToMany(() => Testimonial, (testimonial) => testimonial.tags)
  testimonials: Testimonial[];
}
