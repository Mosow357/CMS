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
import { LoginDto } from "src/auth/dto/login.dto";
import { UserOrganization } from "src/user_organization/entities/userOrganization.entity";


describe('Invitation integration', () => {
    let app: INestApplication;
    let testUser1:User;
    let tokenUser1:string;
    let cmsUser!:User;
    let tokenCmsUser:string;

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
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({ whitelist: true, transform: true }),
        );
        
        await app.init();
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
        testUser1 = await userService.findOneWithOrganizations(user.id);
        const loginInput: LoginDto = {
              password: '123456789',
              username: user.username,
            };
        const loginRes1 = await request
              .default(app.getHttpServer())
              .post('/auth/login')
              .send(loginInput);
        tokenUser1 = loginRes1.body.token;
        //cms user
        const loginCmsInput: LoginDto = {
              password: '123456789',
              username: "cms391547@gmail.com",
            };
        const loginCms = await request
              .default(app.getHttpServer())
              .post('/auth/login')
              .send(loginCmsInput);
        tokenCmsUser = loginCms.body.token;
    });

    describe("Organization Management - Invite", () => {
        it("should send an invitation email to a new user", async () => {
            const invitePayload: InviteUserToOrganizationDto = {
                email: "cms391547@gmail.com",
                organizationId: testUser1.userOrganizations[0].organizationId,
                role: "editor"
            };
            expect(invitePayload.organizationId).toBeDefined();
            let result = await request
                .default(app.getHttpServer())
                .post('/organization-management/invite')
                .send(invitePayload)
                .set('Authorization', `Bearer ${tokenUser1}`);
            expect(result.status).toBe(200);
        })
    })
});