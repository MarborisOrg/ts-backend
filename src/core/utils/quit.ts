import { freeCore } from '#core/free/index';

/**
 * This function closes the application safely.
 */
export function quit(): void {
  void (async function (): Promise<void> {
    await freeCore();
    process.exit(0);
  })();
}
