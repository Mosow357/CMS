import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
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