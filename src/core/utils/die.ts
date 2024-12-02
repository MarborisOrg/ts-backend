/**
 * This function closes the program immediately and ignores everything.
 */
export function die(): void {
  echo('warn: [force] process exit!');
  process.exit(1);
}
