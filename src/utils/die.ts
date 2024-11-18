export function die() {
  log.warn('[force] process exit!');
  process.exit(1);
}
