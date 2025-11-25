import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { APIResponse } from 'mailersend/lib/services/request.service';
@Injectable()
export class EmailProviderService {

    constructor(private config:ConfigService){}

    async sendEmail(to: string, subject: string, body: string): Promise<APIResponse> {
        const apiKey = this.config.get('MAILERSEND_API_TOKEN');
        const domain = this.config.get('MAILERSEND_DOMAIN');
        
        const mailerSend = new MailerSend({
            apiKey: apiKey,
        });

        const sentFrom = new Sender(domain, "Test email");

        const recipients = [
            new Recipient(to, "Your Client")
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("This is a Subject")
            .setHtml("Greetings from the team, you got this message through MailerSend.")
            .setText("Greetings from the team, you got this message through MailerSend.");

        return await mailerSend.email.send(emailParams);
    }
}
