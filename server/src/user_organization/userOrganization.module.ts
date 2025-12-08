
import { Module } from '@nestjs/common';
import { UserOrganization } from './entities/userOrganization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrganizationService } from './services/userOrganization.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization])],
  controllers: [],
  providers: [UserOrganizationService],
  exports: [UserOrganizationService],
})
export class UserOrganizationModule {}