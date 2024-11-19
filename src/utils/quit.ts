import { freeAll } from '#free';

export function quit(): void {
  (async function () {
    await freeAll();
    process.exit(0);
  })();
}
