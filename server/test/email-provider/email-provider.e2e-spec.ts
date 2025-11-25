import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "src/common/guards/auth.guard";
import { NotificationsModule } from "src/notifications/notifications.module";

describe('Notifications integration', () => {
  let app: INestApplication;
  let emailProviderService: any;

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
          autoLoadEntities: true,
          synchronize: true,
        }),
        NotificationsModule
      ],
      providers: [
          {
            provide: APP_GUARD,
            useClass: AuthGuard,
          },
        ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
  });

  describe('EmailProviderService', () => {
    it('should send an email', async () => {
      const emailProviderService = app.get('EmailProviderService');
      const response = await emailProviderService.sendEmail()
        
    });
  })

});