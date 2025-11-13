import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { User } from './users/entities/user.entity';
import { Testimonial } from './testimonials/entities/testimonial.entity';
import { Tag } from './tags/entities/tag.entity';
import { Category } from './categories/entities/category.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'cms_db',
      entities: [User, Testimonial, Tag, Category],
      synchronize: true,
    }),
    UsersModule,
    TestimonialsModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
  ],
})
export class AppModule {}
