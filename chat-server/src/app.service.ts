import { Injectable, Logger } from '@nestjs/common';
import { Worker } from 'worker_threads';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.verbose('Triggering worker job', 'AppService');
    const worker: Worker = new Worker(`${__dirname}/workers/worker.js`);
    worker.on('message', (data) => {
      Logger.verbose(`data:${data}`, 'AppService');
      Logger.verbose('Worker is done', 'AppService');
    });
    return 'Hello World!';
  }

  workerless(): string {
    Logger.verbose(
      `Doing intensive task ${this.intensiveTask()}`,
      'Workerless',
    );
    return 'Hello world';
  }

  intensiveTask() {
    let p = 0;
    for (let i = 0; i < 10000000000; i++) {
      p = p + i;
    }
    return p;
  }
}
