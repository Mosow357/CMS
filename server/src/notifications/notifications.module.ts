import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { EmailProviderService } from './services/email-provider.service';
import { EmailTemplateService } from './services/email-template.service';

@Module({
  providers: [NotificationsService, EmailProviderService, EmailTemplateService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
