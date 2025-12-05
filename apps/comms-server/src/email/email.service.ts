import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { welcome } from './templates/welcome';

@Injectable()
export class EmailService {
  private resend: Resend;
  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get<string>('RESEND_API'));
  }

  async sendTestEmail() {
    const msg = {
      to: 'axjh03@gmail.com',
      from: 'Acme <onboarding@resend.dev>',
      subject: 'Testing SendGrid Email Connection',
      text: 'Delivery of this email means that the email connection works',
      html: '<strong>Test</strong>',
    };
  
    try{
      await this.resend.emails.send(msg);
      return "Mail Sent"
    }
    catch(e){
      console.error('Failed to send email:', e);
      return `Mail not sent: ${e.message}`
    }
  }


  // 1 Account Created
  // say we welcome a Full Name, created
  
  async welcomeUser(reciever:string, sender:string, subject:string, text:string, userDetails:{fName:string, lName:string, uname:string}){
    const html = `<h3>Hello ${userDetails.fName} ${userDetails.lName} (${userDetails.uname})</h3><br>${welcome.accCreated}`

    const msg = {to: reciever, from:sender, subject:subject, text:text, html:html}

    try{
      await this.resend.emails.send(msg)
    }
    catch(e){
      console.error("Failed to send email: ", e)
      return `Mail not sent : ${e.message}`
    }

  }

}
