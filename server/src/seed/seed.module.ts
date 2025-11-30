import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/entities/category.entity";
import { OrganizationRole } from "src/common/types/userRole";
import { Organization } from "src/organizations/entities/organization.entity";
import { CreateTestimonialDto } from "src/testimonials/dto/create-testimonial.dto";
import { Testimonial } from "src/testimonials/entities/testimonial.entity";
import { MediaType } from "src/testimonials/enums/mediaType";
import { UserOrganization } from "src/user_organization/entities/userOrganization.entity";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/services/users.service";
import { UsersModule } from "src/users/users.module";
import { Repository } from "typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User, Organization, UserOrganization,Testimonial,Category]), UsersModule],
})
export class SeedModule implements OnModuleInit {
    constructor(
        private userService: UsersService,
        @InjectRepository(Organization) private orgRepo: Repository<Organization>,
        @InjectRepository(UserOrganization) private userOrgRepo: Repository<UserOrganization>,
        @InjectRepository(Testimonial) private testimonialRepo: Repository<Testimonial>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
    ) { }
    async onModuleInit() {
        if (process.env.SEED_DB !== 'true')
            return;
        await this.run();
    }

    async run() {
        //create categories
        await this.createCategories(5);
        //cms user
        let user = await this.userService.create({ email: `cms391547@gmail.com`, password: "123456789", username: `cms`, name: `Test CMS user` });
        let org = await this.orgRepo.save({ name: `CMS Org`, description: `organization of CMS` });
        await this.userOrgRepo.save({ organizationId: org.id, userId: user.id, role: OrganizationRole.ADMINISTRATOR });

        // Create 5 random users
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
            let category = await this.categoryRepo.findOne({where: {name: "Category 1"}})
            await this.createTestimonials(3, org,category?.id || '');
            await this.userOrgRepo.save({ organizationId: org.id, userId: user.id, role: OrganizationRole.ADMINISTRATOR });
        }
    }

    async createTestimonials(count: number, organization:Organization,categoryId:string) {
        for (let i = 0; i < count; i++) {
            let userNumber = i + 1;
            let testimonial:CreateTestimonialDto = {
                category_id: categoryId,
                content: `This is testimonial content for organization ${organization.name}`,
                media_type: MediaType.TEXT,
                organitation_id: organization.id,
                title: `Testimonial Title ${userNumber}`,
                stars_rating: Math.floor(Math.random() * 5) + 1,
                client_email: `client_${userNumber}@example.com`,
                client_name: `Client Name ${userNumber}`,
            }
            await this.testimonialRepo.save(testimonial);
        }
    }
    async createCategories(count: number) {
        for (let i = 0; i < count; i++) {
            let category = this.categoryRepo.create({ name: `Category ${i + 1}`, description: `Description for category ${i + 1}` });
            await this.categoryRepo.save(category);
        }
    }
}