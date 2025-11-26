import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private readonly emailservice:EmailService){}

    @Post("test-send")
    async sendTestEmail(){
        return this.emailservice.sendTestEmail()
    }
}
