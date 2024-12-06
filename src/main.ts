/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description Main entry point for initializing the application.
 * This module sets up the core components and libraries required for the application to run.
 */

import { LoadEnv } from '#config/env_get';
import { InitCore } from '#core/init/index';
import { Init } from '#helpers/init';
import { where } from '#helpers/where';
import { InitLib } from '#lib/index';
import { InitEcho } from '#utils/echo';

/**
 * Initializes the application by setting up libraries and core components.
 * This includes error handling for module initialization and starting the application.
 *
 * @function
 * @returns {void}
 */
void ((): void => {
  new (class extends InitEcho {
    public constructor() {
      super();
      void this.initialize();
    }

    /**
     * Initializes the application and its libraries.
     * Logs the initialization process and handles any errors that occur during library setup.
     *
     * @async
     * @returns {Promise<void>}
     */
    public async initialize(): Promise<void> {
      echo('info: Application is initializing...');

      /**
       * Initializes the global library.
       * If successful, starts the application; otherwise, logs the error.
       */
      try {
        await new InitLib().init();
        void this.start();
      } catch (err) {
        console.error(err);
      }
    }

    /**
     * Runs the core application logic after environment loading.
     * Logs the running status and initializes the core functionality.
     *
     * @private
     * @returns {void}
     */
    #run(): void {
      echo('info: Running the application...');
      void new LoadEnv()
        .init()
        .then(function () {
          void $.core();
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    /**
     * Starts the application by initializing the core components.
     * Calls the private run method to execute the main application logic.
     *
     * @returns {void}
     */
    public async start(): Promise<void> {
      /**
       * Initializes the core functionality for the current file.
       */
      new InitCore();
      await new Init().init();
      where();
      this.#run();
    }
  })();
})();
