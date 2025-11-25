import { Injectable } from '@nestjs/common';
import { EmailProviderService } from './email-provider.service';
import { EmailNotificationBase } from '../email-templates/emailNotificationBase';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly emailProvider: EmailProviderService,
    ) {}

    async sendNotificationWithTemplate(emailNotificationDto:EmailNotificationBase){
        return await this.emailProvider.sendEmail(emailNotificationDto)
    }
}
