// clean up app when quit
// note: process.on('exit') (fail exit) doesn't support async

import { freeCore } from '#core/free/index';

const sleep = (ms: number): void => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    /* empty */
  }
};

process.on('exit', (_code) => {
  void freeCore();
  sleep(3000); // useful for parallel free
  echo('core: App closed');
});

process.on('SIGINT', (): void => quit());
process.on('SIGTERM', (): void => quit());
