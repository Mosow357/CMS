import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity('testimonials')
export class Testimonial extends BaseEntity {

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid' })
  category_id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  media_url: string;

  @Column({ type: 'varchar', nullable: true })
  media_type: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @ManyToOne(() => User, (user) => user.testimonials)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Category, (category) => category.testimonials)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Tag, (tag) => tag.testimonials)
  @JoinTable({
    name: 'testimonial_tags',
    joinColumn: {
      name: 'testimonial_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
