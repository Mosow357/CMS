import { RESET_PASSWORD_TEMPLATE_ID } from "../constants/templatesId";
import { ResetPasswordTemplateDto } from "../dto/resetPassword.dto";
import { EmailNotificationBase } from "./emailNotificationBase";

export class ResetPasswordEmailTemplate extends EmailNotificationBase{

    constructor(input:ResetPasswordTemplateDto){
        super();
        this.recipentEmail = input.toEmail;
        this.templateId = RESET_PASSWORD_TEMPLATE_ID;

        this.subject = `CMS - Password Reset`;
        this.variables = {
            username: input.username,
            token: input.token
        };
    }
}