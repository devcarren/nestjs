import { Injectable } from '@nestjs/common';
import { MailDTO } from './mail.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

@Injectable()
export class MailService {
  private async compileTemplate(templatePath: string, context: any): Promise<string> {
    const filePath = path.join(__dirname, '..', 'templates', templatePath);
    const templateString = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(templateString);
    return template(context);
  }
  private async getMailContent(mailTemplate: string, templateContext: any): Promise<string> {
    return await this.compileTemplate(mailTemplate, templateContext);
  }

  async sendMail(mailDTO: MailDTO, mailTemplate: string) {
    const { from, to, subject, templateContext } = mailDTO;
    const html = await this.getMailContent(mailTemplate, templateContext);

    const mailOptions = {
      from: from,
      to,
      subject,
      html,
    };

    // await this.transporter.sendMail(mailOptions);
  }

  async sendMailWithAttachements(mailDTO: MailDTO, mailTemplate: string) {
    const { from, to, subject, templateContext, attachements } = mailDTO;
    const html = await this.getMailContent(mailTemplate, templateContext);
    const mailOptions = {
      from: from,
      to,
      subject,
      html,
      attachements,
    };

    // await this.transporter.sendMail(mailOptions);
  }
}
