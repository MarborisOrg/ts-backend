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

        if (
          message.includes('err') ||
          message.includes('error') ||
          message.includes('throw')
        ) {
          color = '\x1b[31m'; // Red for errors
        } else if (message.includes('info')) {
          color = '\x1b[32m'; // Green for info
        } else if (message.includes('warn')) {
          color = '\x1b[33m'; // Yellow for warnings
        } else if (message.includes('debug')) {
          color = '\x1b[34m'; // Blue for debug messages
        }

        console.log(`${color}${message}\x1b[0m`); // چاپ پیام با رنگ مناسب
      }
    }
    globalThis.echo = echo;
  }
}
