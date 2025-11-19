import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { organizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organitations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [organizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationModule {}
