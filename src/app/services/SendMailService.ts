import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async execute(
    to: string,
    subject: string,
    variables: object,
    templatePath: string,
  ) {
    const templateFileContent = fs.readFileSync(templatePath).toString('utf8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const htmlOutput = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      from: 'NPS <noreply@nps.com>',
      to,
      subject,
      html: htmlOutput,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
