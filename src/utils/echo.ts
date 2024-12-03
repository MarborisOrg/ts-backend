// need mode.ts
import { config, ConfigLoader } from '#utils/mode';

enum LogColor {
  Default = '\x1b[0m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Cyan = '\x1b[36m',
  Magenta = '\x1b[35m',
}

export class InitEcho extends ConfigLoader {
  protected constructor() {
    super();
    this.init();
  }

  private init(): void {
    globalThis.echo = this.createEchoFunction();
  }

  private createEchoFunction(): (message: string, ...args: any[]) => void {
    return (message: string, ...args: any[]): void => {
      if (config.debug) {
        const color = this.getLogColor(message);
        const formattedMessage = this.formatMessage(message, args);
        console.log(`${color}${formattedMessage}${LogColor.Default}`);
      }
    };
  }

  private getLogColor(message: string): string {
    const lowerCaseMessage = message.toLowerCase();
    return lowerCaseMessage.includes('err') ||
      lowerCaseMessage.includes('error') ||
      lowerCaseMessage.includes('throw')
      ? LogColor.Red
      : lowerCaseMessage.includes('info')
        ? LogColor.Green
        : lowerCaseMessage.includes('warn')
          ? LogColor.Yellow
          : lowerCaseMessage.includes('debug')
            ? LogColor.Blue
            : lowerCaseMessage.includes('success')
              ? LogColor.Cyan
              : lowerCaseMessage.includes('core')
                ? LogColor.Magenta
                : LogColor.Default; // Default color if no match
  }

  private formatMessage(message: string, args: any[]): string {
    return args.length > 0 ? `${message} ${args.join(' ')}` : message;
  }
}
