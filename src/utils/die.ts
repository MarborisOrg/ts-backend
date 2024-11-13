export function die(): void {
  log.warn("[force] process exit!");
  process.exit(1);
}
