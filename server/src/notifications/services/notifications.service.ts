import { Injectable } from '@nestjs/common';
import { EmailProviderService } from './email-provider.service';
import { EmailTemplateService } from './email-template.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly emailProvider: EmailProviderService,
        private readonly emailTemplate: EmailTemplateService,
    ) {}

    async sendEmailTo(email:string, organizationName:string){

    }
}
