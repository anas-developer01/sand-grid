// src/email/email.service.ts

import { Injectable } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/mail';
import { SendGridClient } from './sendgrid-client';

@Injectable()
export class EmailService {
  constructor(private readonly sendGridClient: SendGridClient) { }

  async sendTestEmail(
    recipient: string,
    body = 'This is a test mail',
  ): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: 'adilmustafa006@gmail.com', //Approved sender ID in Sendgrid
      subject: 'Test email',
      content: [{ type: 'text/plain', value: body }],
    };
    await this.sendGridClient.send(mail);
  }

  async sendEmailWithTemplate(recipient: string, body: string): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: 'adilmustafa006@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      dynamicTemplateData: { body, subject: 'Send Email with template' },
    };
    await this.sendGridClient.send(mail);
  }
}
