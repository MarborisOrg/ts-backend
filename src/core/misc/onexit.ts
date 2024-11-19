// clean up app when quit
// note: die (fail exit) doesn't support async
import { freeAll } from '#free/index';

process.on('exit', (_code) => {
  freeAll();
  console.log('App closed');
});

process.on('SIGINT', async () => {
  await freeAll();
  quit();
});

process.on('SIGTERM', async () => {
  await freeAll();
  quit();
});
