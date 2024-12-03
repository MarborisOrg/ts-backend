/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module is responsible for loading and managing application configuration.
 * It utilizes the yargs library to parse command-line arguments and provides a structured configuration object.
 */

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

// Define the structure of the configuration object
type Config = {
  dev: boolean; // Indicates if the application is in developer mode
  debug: boolean; // Indicates if debug mode is enabled
  type: 'express' | 'rabbit' | 'database'; // Specifies the type of application
};

// Export the configuration object
export let config: Config;

/**
 * Class responsible for loading the application configuration from command-line arguments.
 */
export class ConfigLoader {
  protected constructor() {
    this.loadConfig();
  }

  /**
   * Loads the configuration from command-line arguments using yargs.
   * Sets the global config variable based on the parsed arguments.
   *
   * @private
   * @returns {void}
   */
  private loadConfig(): void {
    const argv = yargs(hideBin(process.argv)).options({
      dev: { type: 'boolean', default: false }, // Developer mode flag
      debug: { type: 'boolean', default: false }, // Debug mode flag
      type: {
        type: 'string',
        choices: ['express', 'rabbit', 'database'], // Allowed application types
        default: 'express', // Default application type
      },
    }).argv as Config;

    // Assign parsed arguments to the config object
    config = {
      dev: argv.dev,
      debug: argv.debug,
      type: argv.type,
    };

    this.logConfig(); // Log the loaded configuration
  }

  /**
   * Logs the current configuration to the console.
   *
   * @private
   * @returns {void}
   */
  private logConfig(): void {
    console.log(`------------------------------------------`);
    console.log(`Debug mode: ${config.debug}`);
    console.log(`Developer mode: ${config.dev}`);
    console.log(`Type: ${config.type}`);
    console.log(`------------------------------------------`);
  }
}
