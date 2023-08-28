export class MailDTO {
  from: string;
  to: string[];
  subject: string;
  body?: string;
  cc?: string[];
  bcc?: string[];
  attachements?: any[];
  templateContext?: any;
}
