import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { organizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';
import { UserOrganization } from 'src/user_organization/entities/userOrganization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization,UserOrganization])],
  controllers: [organizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationModule {}
