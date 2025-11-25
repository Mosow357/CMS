export interface EmailNotificationBase {
  recipentEmail: string;
  username:string;
  templateId:string;
  variables:object;
  subject?: string;
  html?: string;
  text?: string;
  metadata?: Record<string, unknown>;
}