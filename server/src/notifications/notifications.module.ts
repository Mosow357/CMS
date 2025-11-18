import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { EmailProviderService } from './services/email-provider.service';

@Module({
  providers: [NotificationsService, EmailProviderService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
