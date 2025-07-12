import nodemailer from 'nodemailer';
import { MailOptions } from '@shared/types/mail-options.type';

class Mailer {

  private readonly transporter: nodemailer.createTransport;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    });
  }

  async send(options: MailOptions) {
    options.from = `${process.env.MAIL_NAME}  <${process.env.MAIL_USER}>`;
    return await this.transporter.sendMail(options);
  }

}

export default new Mailer();