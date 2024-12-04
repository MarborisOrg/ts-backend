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
  init: boolean;
  https: boolean;
  anchor: boolean;
  where: boolean;
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
      /**
       * @helpers init
       */
      init: { type: 'boolean', default: false }, // Init flag
      https: { type: 'boolean', default: false },
      /**
       * @helpers anchor
       */
      anchor: { type: 'boolean', default: false },
      where: { type: 'boolean', default: false },
    }).argv as Config; // Cast argv to Config type

    // Check if --init is used with any other flags
    if (
      argv.init &&
      (argv.dev ||
        argv.debug ||
        argv.type !== 'express' ||
        argv.anchor ||
        argv.where)
    ) {
      throw new Error('The --init flag cannot be used with any other flags.');
    }
    if (argv.where && (argv.dev || argv.debug || argv.type !== 'express')) {
      throw new Error('The --anchor flag cannot be used with any other flags.');
    }

    // If --init is used, set config accordingly
    // if (argv.init) {
    //   config = {
    //     dev: false, // Default value for dev when init is used
    //     debug: false, // Default value for debug when init is used
    //     type: 'express', // Default type when init is used
    //     init: true, // Set init to true
    //     https: false,
    //     anchor: false,
    //   };
    // } else if (argv.dev || argv.debug || argv.type) {
    // Assign parsed arguments to the config object if any other flag is used
    config = {
      dev: argv.dev,
      debug: argv.debug,
      type: argv.type,
      init: argv.init, // Set init to false
      https: argv.https,
      anchor: argv.anchor,
      where: argv.where,
    };
    // } else {
    //   // If no flags are provided, throw an error and exit
    //   throw new Error(
    //     'You must use the --init flag or at least one of the other flags (dev, debug, type).'
    //   );
    // }

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
