
export function die(): void {
    log.warn("process exit!")
    process.exit(1);
}
