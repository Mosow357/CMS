
import { Module } from '@nestjs/common';
import { UserOrganization } from './entities/userOrganization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrganization])],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserOrganizationModule {}