import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as request from 'supertest';
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { InviteUserToOrganizationDto } from "src/organization-management/dto/inviteUserToOrganization.dto";
import { SeedModule } from "src/seed/seed.module";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/services/users.service";
import { OrganizationsService } from "src/organizations/services/organizations.service";


describe('Invitation integration', () => {
    let app: INestApplication;
    let testUser:User
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env',
                    isGlobal: true,
                }),
                AppModule,
                SeedModule
            ],
        }).compile();
        const config = moduleRef.get(ConfigService);
        expect(config.get('NODE_ENV')).toBe('development');

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({ whitelist: true, transform: true }),
        );
        let userService = moduleRef.get(UsersService);
        let user = await userService.create({
            email: "invitationTest@test.com",
            password: "123456789",
            username: "invitationTestUser",
            name: "Invitation Test User"
        });
        let organizationService = moduleRef.get(OrganizationsService);
        await organizationService.create({
            description: "Organization for invitation testing",
            name: "Invitation Test Org",
            questionText: "",
        },user);
        testUser = await userService.findOneWithOrganizations(user.id);
        await app.init();
    });

    describe("Organization Management - Invite", () => {
        it("should send an invitation email to a new user", async () => {
            const invitePayload: InviteUserToOrganizationDto = {
                email: "cms391547@gmail.com",
                organizationId: testUser.userOrganizations[0].organizationId,
                role: "editor"
            };
            expect(invitePayload.organizationId).toBeDefined();
            let result = await request
                .default(app.getHttpServer())
                .post('/organization-management/invite')
                .send(invitePayload);
            expect(result.status).toBe(200);
        })
    })
});