import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { User } from './users/entities/user.entity';
import { Testimonial } from './testimonials/entities/testimonial.entity';
import { Tag } from './tags/entities/tag.entity';
import { Category } from './categories/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './common/guards/auth.guard';
import { UserOrganizationModule } from './user_organization/userOrganization.module';
import { OrganizationModule } from './organizations/organitations.module';
import { MediaStorageModule } from './media-storage/mediaStorage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'cms_db',
      entities: [User, Testimonial, Tag, Category],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    UsersModule,
    TestimonialsModule,
    CategoriesModule,
    TagsModule,
    AuthModule,
    UserOrganizationModule,
    OrganizationModule,
    MediaStorageModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
