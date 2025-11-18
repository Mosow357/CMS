import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/entities/category.entity";
import { MockMediaStorageProviderImpl } from "src/media-storage/adapters/mockMediaStorageProviderImpl";
import { IMediaStorageProvider } from "src/media-storage/ports/ImediaStorageProvider";
import { MediaStorageService } from "src/media-storage/services/mediaStorage.service";
import { Tag } from "src/tags/entities/tag.entity";
import { CreateTestimonialDto } from "src/testimonials/dto/create-testimonial.dto";
import { Testimonial } from "src/testimonials/entities/testimonial.entity";
import { TestimonialsModule } from "src/testimonials/testimonials.module";
import { User } from "src/users/entities/user.entity";
import * as request from 'supertest';

describe('Testimonials integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User, Testimonial, Tag, Category],
          synchronize: true,
        }),
        TestimonialsModule
      ],
      providers: [
        MediaStorageService,
        {
            provide: IMediaStorageProvider,
            useClass: MockMediaStorageProviderImpl
        }
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
  });

  it('should create a new testimonial with default data, returns testimonial created', async () => {
      //arrange
      const createTestimonialDto: CreateTestimonialDto = {
        title: "test_title",
        user_id: "00000000-0000-0000-0000-000000000000",
        media_type: "text",
        content: "This is a test testimonial content."
      };
      //act
      const res = await request
        .default(app.getHttpServer())
        .post('/testimonials')
        .send(createTestimonialDto);
      //assert
      expect(res.status).toBe(201);
    });
});