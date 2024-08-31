import nodemailer, { Transporter } from 'nodemailer'
import { EMAIL } from '../uhuuy.json'

export class EmailService {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EMAIL.HOST,
      port: EMAIL.PORT,
      secure: EMAIL.SECU,
      auth: {
        user: EMAIL.NAME,
        pass: EMAIL.PASS
      }
    })
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    const mailOptions = {
      from: '<support@emr.com>',
      to,
      subject,
      text,
      html
    }

    await this.transporter.sendMail(mailOptions)
  }
}
