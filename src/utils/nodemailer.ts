import ejs from 'ejs'
import path from 'path'
import { EMAIL } from '../uhuuy.json'
import { createTransport } from 'nodemailer'

export class EmailService {
  private transporter

  constructor() {
    this.transporter = createTransport({
      host: EMAIL.HOST,
      port: EMAIL.PORT,
      secure: EMAIL.SECU,
      auth: {
        user: EMAIL.NAME,
        pass: EMAIL.PASS
      }
    })
  }

  async sendMail(to: string, subject: string, templateName: string, templateData: object) {
    try {
      const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.ejs`)

      const html = await ejs.renderFile(templatePath, templateData)

      const mailOptions = { from: EMAIL.FROM, to, subject, html }

      const info = await this.transporter.sendMail(mailOptions)

      console.log('Message sent: %s', info.messageId)

      return info
    } catch (error) {
      console.error('Error sending email: ', error)

      throw error
    }
  }
}
