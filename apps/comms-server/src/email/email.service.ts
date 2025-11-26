import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {
    // hardcoding that it's gonna be string for now
    // urghhhh Typescript
    sgMail.setApiKey(this.config.get<string>('SENDGRID_API_KEY')!);
  }

  async sendTestEmail() {
    const msg = {
      to: 'axj2203@mavs.uta.edu',
      from: 'axjh03@gmail.com',
      subject: 'Testing SendGrid Email Connection',
      text: 'Delivery of this email means that the email connection works',
      html: '<strong>Test</strong>',
    };

    sgMail.send(msg);

    try{
      sgMail.send(msg);
    }
    catch(e){
      console.log(e)
      return "Mail not sent"
    }
    return "Mail Sent"
  }
}
