// need mode.ts
import { config, ConfigLoader } from '#utils/mode';

export class InitEcho extends ConfigLoader {
  public constructor() {
    super();
    this.init();
  }
  private init(): void {
    function echo(message: string | object): void {
      if (config.debug) {
        const messageString =
          typeof message === 'string' ? message : JSON.stringify(message);
        const level = typeof message === 'string' ? 'info' : 'debug';

        let color: string;
        switch (level) {
          case 'info':
            color = '\x1b[32m'; // Green
            break;
          case 'debug':
            color = '\x1b[34m'; // Blue
            break;
          default:
            color = '\x1b[0m'; // Default
        }

        console.log(`${color}${messageString}\x1b[0m`);
      }
    }
    globalThis.echo = echo;
  }
}
