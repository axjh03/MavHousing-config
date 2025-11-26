import { Controller, Get } from '@nestjs/common';
import { CommsServerService } from './comms-server.service';

@Controller("comms")
export class CommsServerController {
  constructor(private readonly commsServerService: CommsServerService) {}

  @Get()
  getHello(): string {
    return this.commsServerService.getHello();
  }
}
