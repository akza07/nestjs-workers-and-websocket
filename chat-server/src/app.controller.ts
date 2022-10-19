import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Req() req: Request) {
    return [
      { withWorker: `${req.protocol}://${req.headers.host}/with-worker` },
      { withoutWorker: `${req.protocol}://${req.headers.host}/without-worker` },
    ];
  }
  @Get('with-worker')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('without-worker')
  helloWorkerless(): string {
    return this.appService.workerless();
  }
}
