import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const emailService = app.select(EmailModule).get(EmailService);

  await emailService.sendTestEmail('anasrasool702@gmail.com');
}
bootstrap();
