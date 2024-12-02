import { freeCore } from '#core/free/index';

/**
 * This function closes the application safely.
 */
export function quit(): void {
  void (async function (): Promise<void> {
    echo('warn: process exit! (Freeing memory)');
    await freeCore();
    echo('warn: process exit!');
    process.exit(0);
  })();
}
