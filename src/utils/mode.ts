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
  rcolor: boolean;
  rabbit: 'send' | 'rec'; // Specifies the type of rabbit application
  queue: string;
  // fast mode ?
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
      d: {
        type: 'boolean',
        alias: 'dev',
        default: false,
        describe: 'Enable developer mode',
      },
      D: {
        type: 'boolean',
        alias: 'debug',
        default: false,
        describe: 'Enable debug mode',
      },
      t: {
        type: 'string',
        alias: 'type',
        choices: ['express', 'rabbit', 'database'],
        default: 'express',
        describe: 'Specify the type of application',
      },
      i: {
        type: 'boolean',
        alias: 'init',
        default: false,
        describe: 'Initialize the application',
      },
      h: {
        type: 'boolean',
        alias: 'https',
        default: false,
        describe: 'Enable HTTPS',
      },
      a: {
        type: 'boolean',
        alias: 'anchor',
        default: false,
        describe: 'Enable anchor',
      },
      w: {
        type: 'boolean',
        alias: 'where',
        default: false,
        describe: 'Enable where',
      },
      r: {
        type: 'boolean',
        alias: 'rcolor',
        default: false,
        describe: 'Enable rcolor',
      },
      R: {
        type: 'string',
        alias: 'rabbit',
        choices: ['rec', 'send'],
        default: 'rec',
        describe: 'Specify the type of rabbit application',
      },
      queue: { type: 'string', default: '' },
    }).argv as unknown as Config;

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
    if (argv.type == 'rabbit') {
      if (argv.queue == '' || argv.queue === null || argv.queue === undefined) {
        throw new Error('Give a queue channel for rabbit');
      }
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
      rcolor: argv.rcolor,
      queue: argv.queue,
      rabbit: argv.rabbit,
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
