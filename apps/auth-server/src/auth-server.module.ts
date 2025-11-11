import { Module } from '@nestjs/common';
import { AuthServerController } from './auth-server.controller';
import { AuthServerService } from './auth-server.service';

@Module({
  imports: [],
  controllers: [AuthServerController],
  providers: [AuthServerService],
})
export class AuthServerModule {}
