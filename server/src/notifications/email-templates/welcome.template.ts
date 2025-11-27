import { EmailNotificationBase } from "./emailNotificationBase";

export class WelcomeEmailTemplate implements EmailNotificationBase{
    recipentEmail: string;
    username: string;
    templateId: string;
    variables: object;
    subject?: string;
    html?: string | undefined;
    text?: string | undefined;
    metadata?: Record<string, unknown> | undefined;

    constructor(to: string, username: string) {
        this.recipentEmail = to;
        this.username = username;
        this.templateId = "z86org8dnp0lew13";
        this.subject = "Welcome to " + "CMS" + "!";
        this.variables = {
            username: username,
        };
    }
}