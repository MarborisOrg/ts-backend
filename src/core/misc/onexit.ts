// clean up app when quit
// note: process.on('exit') (fail exit) doesn't support async

import { freeCore } from '#core/free/index';

process.on('exit', (_code) => {
  void freeCore();
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
