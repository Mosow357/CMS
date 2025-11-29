import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import { CategoriesModule } from "src/categories/categories.module";
import { Category } from "src/categories/entities/category.entity";
import { AuthGuard } from "src/common/guards/auth.guard";
import { MediaStorageModule } from "src/media-storage/mediaStorage.module";
import { Organization } from "src/organizations/entities/organization.entity";
import { OrganizationModule } from "src/organizations/organitations.module";
import { Tag } from "src/tags/entities/tag.entity";
import { TagsModule } from "src/tags/tags.module";
import { Testimonial } from "src/testimonials/entities/testimonial.entity";
import { TestimonialsModule } from "src/testimonials/testimonials.module";
import { UserOrganization } from "src/user_organization/entities/userOrganization.entity";
import { User } from "src/users/entities/user.entity";
import { UsersModule } from 'src/users/users.module';
import * as request from 'supertest';

describe('Testimonials integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      }), AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
  });
  it('should run the app', async () => {

    const res = await request
      .default(app.getHttpServer())
      .get('/')
    expect(res.status).toBe(404);
  });
});