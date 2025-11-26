import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports : [
    ConfigModule.forRoot({isGlobal: true})
  ],
  providers: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
