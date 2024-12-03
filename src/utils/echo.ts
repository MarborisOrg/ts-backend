/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module initializes the echo functionality for logging messages to the console.
 * It provides color-coded logging based on the content of the messages and utilizes configuration settings.
 */

// Importing necessary utilities for configuration loading
import { config, ConfigLoader } from '#utils/mode';

/**
 * Enum representing log colors for console output.
 * Each color corresponds to a specific ANSI escape code.
 */
enum LogColor {
  Default = '\x1b[0m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Cyan = '\x1b[36m',
  Magenta = '\x1b[35m',
}

/**
 * Class responsible for initializing the echo functionality for logging.
 * Extends the ConfigLoader to utilize configuration settings.
 */
export class InitEcho extends ConfigLoader {
  protected constructor() {
    super();
    this.init();
  }

  /**
   * Initializes the echo function globally.
   * This function will be used for logging messages to the console.
   *
   * @private
   * @returns {void}
   */
  private init(): void {
    globalThis.echo = this.createEchoFunction();
  }

  /**
   * Creates a logging function that formats and colors messages based on their content.
   *
   * @private
   * @returns {(message: string, ...args: any[]) => void} The echo function.
   */
  private createEchoFunction(): (message: string, ...args: any[]) => void {
    return (message: string, ...args: any[]): void => {
      if (config.debug) {
        const color = this.getLogColor(message);
        const formattedMessage = this.formatMessage(message, args);
        console.log(`${color}${formattedMessage}${LogColor.Default}`);
      }
    };
  }

  /**
   * Determines the appropriate log color based on the message content.
   *
   * @private
   * @param {string} message - The message to analyze for log color.
   * @returns {string} The ANSI color code for the log message.
   */
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

  /**
   * Formats the log message by appending additional arguments if provided.
   *
   * @private
   * @param {string} message - The main log message.
   * @param {any[]} args - Additional arguments to include in the log.
   * @returns {string} The formatted log message.
   */
  private formatMessage(message: string, args: any[]): string {
    return args.length > 0 ? `${message} ${args.join(' ')}` : message;
  }
}