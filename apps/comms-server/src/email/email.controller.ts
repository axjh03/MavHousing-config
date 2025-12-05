import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { BaseAuthGuard } from 'apps/auth-server/src/guards/baseauth.guard';

@Controller('email')
export class EmailController {
    constructor(private readonly emailservice:EmailService){}

    @Post("test-send")
    async sendTestEmail(){
        return this.emailservice.sendTestEmail()
    }

    @Post("welcome-new")
    @ApiOperation({ summary: 'Send welcome email to new user' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                reciever: { type: 'string', example: 'axjh03@gmail.com' },
                sender: { type: 'string', example: 'Acme <onboarding@resend.dev>' },
                subject: { type: 'string', example: 'Welcome to Mav Housing' },
                text: { type: 'string', example: 'Welcome to our platform!' },
                userDetails: {
                    type: 'object',
                    properties: {
                        fName: { type: 'string', example: 'John' },
                        lName: { type: 'string', example: 'Doe' },
                        uname: { type: 'string', example: 'johndoe' },
                    },
                    required: ['fName', 'lName', 'uname'],
                },
            },
            required: ['reciever', 'sender', 'from', 'subject', 'text', 'userDetails'],
        },
    })
    
    @ApiResponse({ status: 200, description: 'Email sent successfully', example: { message: 'Mail Sent' } })
    @ApiResponse({ status: 400, description: 'Failed to send email' })
    @ApiBearerAuth()
    @UseGuards(BaseAuthGuard)
    async welcomeUser(
        
        @Body() payload: {
            reciever: string;
            sender: string;
            subject: string;
            text: string;
            userDetails: { fName: string; lName: string; uname: string };
        }
    ){
        return this.emailservice.welcomeUser(
            payload.reciever,
            payload.sender,
            payload.subject,
            payload.text,
            payload.userDetails
        )
    }
}
