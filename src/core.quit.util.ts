/**
 * This function closes the application safely.
 */
export function quit(): void {
  echo('warn: process exit!');
  process.exit(0);
}
