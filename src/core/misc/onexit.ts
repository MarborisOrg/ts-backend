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
  console.log('App closed');
});

process.on('SIGINT', async () => {
  await freeCore();
  quit();
});

process.on('SIGTERM', async () => {
  await freeCore();
  quit();
});
