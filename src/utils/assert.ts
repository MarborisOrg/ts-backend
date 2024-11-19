export function assert(err: string | null = 'undefined error'): void {
  log.error(err);
  quit()
}
