import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendGridClient {
  private logger: Logger;

  constructor() {
    // Initialize the logger. This is done for simplicity. You can use a logger service instead
    this.logger = new Logger(SendGridClient.name);

    console.log(process.env.SENDGRID_API_KEY);

    // Get the API key from config service or environment variable
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(mail: any): Promise<void> {
    try {
      await sgMail.send(mail);
      this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
    } catch (error) {
      // You can do more with the error
      this.logger.error('Error while sending email', error);
      throw error;
    }
  }
}
