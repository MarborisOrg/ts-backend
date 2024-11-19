import { freeAll } from '#free/index';

/**
 * This function closes the application safely.
 */
export function quit(): void {
  (async function () {
    await freeAll();
    process.exit(0);
  })();
}
