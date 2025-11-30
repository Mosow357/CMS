import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationRole } from "src/common/types/userRole";
import { Organization } from "src/organizations/entities/organization.entity";
import { UserOrganization } from "src/user_organization/entities/userOrganization.entity";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/services/users.service";
import { UsersModule } from "src/users/users.module";
import { Repository } from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User, Organization, UserOrganization,]), UsersModule],
})
export class SeedModule implements OnModuleInit {
    constructor(
        private userService: UsersService,
        @InjectRepository(Organization) private orgRepo: Repository<Organization>,
        @InjectRepository(UserOrganization) private userOrgRepo: Repository<UserOrganization>,
    ) { }
    async onModuleInit() {
        await this.run();
    }

    async run() {
        //default user
        let user = await this.userService.create({ email: `cms391547@gmail.com`, password: "123456789", username: `cms`, name: `Test CMS user` });
        let org = await this.orgRepo.save({ name: `CMS Org`, description: `organization of CMS` });
        await this.userOrgRepo.save({ organizationId: org.id, userId: user.id, role: OrganizationRole.ADMINISTRATOR });
        await this.createUserWithoutOrg(5);
        await this.createUsersWithOrg(5);
    }

    async createUserWithoutOrg(count: number) {
        for (let i = 0; i < count; i++) {
            let user = await this.userService.create({ email: `test${i + 1}@test.com`, password: "123456789", username: `test_username_${i + 1}`, name: `Test User ${i + 1}` });
        }
    }
    async createUsersWithOrg(count: number) {
        for (let i = 0; i < count; i++) {
            let user = await this.userService.create({ email: `userwithorg${i + 1}@test.com`, password: "123456789", username: `test_username_userwithorg_${i + 1}`, name: `Test Userwithorg ${i + 1}` });
            let org = await this.orgRepo.save({ name: `Test Org ${i + 1}`, description: `organization ${i + 1} description` });
            await this.userOrgRepo.save({ organizationId: org.id, userId: user.id, role: OrganizationRole.ADMINISTRATOR });
        }
    }
}