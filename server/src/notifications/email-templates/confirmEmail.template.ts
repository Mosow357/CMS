import { API_BASE_URL } from "src/common/constant/constant";
import { CONFIRM_EMAIL_TEMPLATE_ID } from "../constants/templatesId";
import { EmailNotificationBase } from "./emailNotificationBase";

export class ConfirmEmailTemplate extends EmailNotificationBase{
    
    constructor(toEmail: string, username: string, token: string){
        super();
        this.recipentEmail = toEmail;
        this.username = username;

        this.templateId = CONFIRM_EMAIL_TEMPLATE_ID;
        this.subject = "Welcome to CMS! confirm your email";
        this.variables = {
            username: username,
            token: token,
            domain: API_BASE_URL
        };
    }
}