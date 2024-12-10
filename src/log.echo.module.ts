/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description This module initializes the echo functionality for logging messages to the console.
 * It provides color-coded logging based on the content of the messages and utilizes configuration settings.
 */

// Importing necessary utilities for configuration loading
import { config } from '#app.main.arg';
import { LogColor } from '#log.color.enum';

/**
 * Class responsible for initializing the echo functionality for logging.
 * Extends the ConfigLoader to utilize configuration settings.
 */
export class InitEcho {
  /**
   * Creates a logging function that formats and colors messages based on their content.
   *
   * @private
   * @returns {(message: string, ...args: any[]) => void} The echo function.
   */
  public createEchoFunction(): (message: string, ...args: any[]) => void {
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

    // Define a mapping of keywords to colors
    const colorMapping: { [key: string]: string } = {
      err: LogColor.Red,
      error: LogColor.Red,
      throw: LogColor.Red,
      info: LogColor.Green,
      warn: LogColor.Yellow,
      debug: LogColor.Blue,
      success: LogColor.Cyan,
      core: LogColor.Magenta,
      critical: LogColor.BrightRed,
      notice: LogColor.BrightYellow,
      alert: LogColor.BrightMagenta,
      failure: LogColor.DarkRed,
      pending: LogColor.LightOrange,
      completed: LogColor.BrightGreen,
      test: LogColor.LightSkyBlue,
      update: LogColor.LightPurple,
    };

    // Check for random color condition
    if (config.rcolor) {
      const randomIndex = Math.floor(
        Math.random() * Object.keys(LogColor).length
      );
      return Object.values(LogColor)[randomIndex];
    }

    // Check for specific keywords and return corresponding color
    for (const [keyword, color] of Object.entries(colorMapping)) {
      if (lowerCaseMessage.includes(keyword)) {
        return color;
      }
    }

    return LogColor.Default; // Default color if no match
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
