import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app.service';
import { parentPort } from 'worker_threads';

async function workerTask() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.select(AppModule).get(AppService);
  Logger.verbose('Executing...', 'Worker');
  const result = appService.intensiveTask();
  Logger.verbose('Done', 'Worker');
  parentPort.postMessage(result);
}

workerTask();
