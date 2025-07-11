import nodemailer from 'nodemailer';
import { MailCallback } from '@shared/types/mail-callback.type';
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

  async send(options: MailOptions, callBack: MailCallback) {
    options.from = `${process.env.MAIL_NAME} <${process.env.MAIL_USER}>`;
    await this.transporter.sendMail(options, callBack);
  }

}

export default new Mailer();