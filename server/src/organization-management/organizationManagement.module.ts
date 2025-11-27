import { Module } from '@nestjs/common';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class OrganizationManagementModule {}