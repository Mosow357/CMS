import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import { RegisterInput } from 'src/auth/dto/register.input';
import { Role } from 'src/common/enums';

describe('Auth integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User, Testimonial, Tag, Category],
          synchronize: true,
        }),
        UsersModule,
        AuthModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  it('should register a new user', async () => {
    //arrange
    const registerDto: RegisterInput = {
      password: '1234567',
      username: 'test',
      email: 'test@test.com',
      lastname: 'test',
      name: 'test',
      role: Role.VISITOR,
    };
    //act
    const res = await request
      .default(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto);
    //assert
    expect(res.status).toBe(201);
  });
  it('should throw exception, email not valid', async () => {
    //arrange
    const registerDto: RegisterInput = {
      password: '1234567',
      username: 'test',
      email: 'testtest.com',
      lastname: 'test',
      name: 'test',
      role: Role.VISITOR,
    };
    //act
    const res = await request
      .default(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto);
    //assert
    expect(res.status).toBe(400);
  });
  it('should throw exception, email not valid', async () => {
    //arrange
    const registerDto: RegisterInput = {
      password: '1234567',
      username: 'test',
      email: 'testtest.com',
      lastname: 'test',
      name: 'test',
      role: Role.VISITOR,
    };
    //act
    const res = await request
      .default(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto);
    //assert
    expect(res.status).toBe(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
