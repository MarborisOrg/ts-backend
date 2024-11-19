import { freeAll } from '#free/index';

export function quit(): void {
  (async function () {
    await freeAll();
    process.exit(0);
  })();
}
