// need mode.ts
import { config, ConfigLoader } from '#utils/mode';

export class InitEcho extends ConfigLoader {
  public constructor() {
    super();
    this.init();
  }
  private init(): void {
    function echo(message: string): void {
      if (config.debug) {
        let color: string = '\x1b[0m'; // Default color
        const lowerCaseMessage = message.toLowerCase();

        if (
          lowerCaseMessage.includes('err') ||
          lowerCaseMessage.includes('error') ||
          lowerCaseMessage.includes('throw')
        ) {
          color = '\x1b[31m'; // Red for errors
        } else if (lowerCaseMessage.includes('info')) {
          color = '\x1b[32m'; // Green for info
        } else if (lowerCaseMessage.includes('warn')) {
          color = '\x1b[33m'; // Yellow for warnings
        } else if (lowerCaseMessage.includes('debug')) {
          color = '\x1b[34m'; // Blue for debug messages
        } else if (lowerCaseMessage.includes('success')) {
          color = '\x1b[36m'; // Cyan for success messages
        }

        console.log(`${color}${message}\x1b[0m`);
      }
    }
    globalThis.echo = echo;
  }
}
