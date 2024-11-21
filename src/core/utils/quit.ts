import { freeCore } from "#core/free/index";

/**
 * This function closes the application safely.
 */
export function quit(): void {
  (async function () {
    await freeCore();
    process.exit(0);
  })();
}
