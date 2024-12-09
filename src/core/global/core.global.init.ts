/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module initializes global utilities for the application, including logging and error handling functions.
 * It sets up a logger instance and attaches various utility functions to the global scope.
 */

import { assert } from '#core/utils/core.assert.util';
import { die } from '#core/utils/core.die.util';
import { Logger } from '#core/utils/core.log.util';
import { quit } from '#core/utils/core.quit.util';

export class InitGlobal {
  /**
   * Constructor for the InitGlobal class.
   * Automatically initializes global utilities upon instantiation.
   */
  public constructor() {
    this.initialize();
  }

  /**
   * Initializes global utilities.
   * Creates a logger instance and attaches it, along with other utility functions, to the global scope.
   */
  private initialize(): void {
    const loggerInstance = new Logger(); // Create a new logger instance
    globalThis.log = loggerInstance.getLogger(); // Attach the logger to the global scope

    // Attach utility functions to the global scope
    globalThis.die = die; // Function to terminate the application
    globalThis.quit = quit; // Function to gracefully exit the application
    globalThis.assert = assert; // Assertion function that may utilize quit and log
  }
}
