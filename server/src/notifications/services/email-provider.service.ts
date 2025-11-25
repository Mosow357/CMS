import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { APIResponse } from 'mailersend/lib/services/request.service';
import { EmailNotificationBase } from '../email-templates/emailNotificationBase';
@Injectable()
export class EmailProviderService {

    constructor(private config: ConfigService) { }

    async sendEmail(emailNotificationDto:EmailNotificationBase): Promise<APIResponse> {
        const apiKey = this.config.get('MAILERSEND_API_TOKEN');
        const domain = this.config.get('MAILERSEND_DOMAIN');

        const mailerSend = new MailerSend({
            apiKey: apiKey,
        });

        const sentFrom = new Sender(domain, "CMS");

        const recipients = [
            new Recipient(emailNotificationDto.recipentEmail, emailNotificationDto.username)
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject(emailNotificationDto.subject || "")
            .setTemplateId(emailNotificationDto.templateId)

        emailParams.personalization = [{
            email: emailNotificationDto.recipentEmail,
            data: emailNotificationDto.variables
        }]

        return await mailerSend.email.send(emailParams);
    }
}
