import { Module } from '@nestjs/common';
import { CommsServerController } from './comms-server.controller';
import { CommsServerService } from './comms-server.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmailModule],
  controllers: [CommsServerController, EmailController],
  providers: [CommsServerService, EmailService],
})
export class CommsServerModule {}
