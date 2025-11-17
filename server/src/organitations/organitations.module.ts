import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organitation } from './entities/organitation.entity';
import { OrganitationsController } from './controllers/organitations.controller';
import { OrganitationsService } from './services/organitations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organitation])],
  controllers: [OrganitationsController],
  providers: [OrganitationsService],
  exports: [OrganitationsService],
})
export class OrganitationModule {}
