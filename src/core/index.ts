/**
 * @author MRB
 * @license MIT
 * @link https://github.com/S-MRB-S
 *
 * This module serves as the main entry point for the application. It initializes the application
 * by forking worker processes and setting up the necessary services based on the configuration.
 * It supports different application types, including Express and Rabbit.
 */

import Forker from './cluster/forker.js';
import { InitApp } from './init/app.js';

// import RabbitApp from '#app/rabbit/index';
import MTProtoApp from '#app/rabbit/mtproto/index';
import ExpressApp from '#app/server/index';

/**
 * Main entry point for the application.
 * This function initializes the application by forking worker processes and setting up the necessary services.
 *
 * @returns A Promise that resolves when the application has been successfully initialized.
 * @throws Will log an error if the initialization fails.
 */
export default async function (): Promise<void> {
  try {
    // Start the forking process for the application, passing the app function and a flag indicating if it's in development mode
    await Forker(app, !$.config.dev); // , 2, 2

    /**
     * Application initialization function.
     * This function is called in each worker process to set up the application environment.
     *
     * @returns A Promise that resolves when the application is fully initialized.
     */
    async function app(): Promise<void> {
      /**
       * Init file for app (express app)
       * This function is repeated on fork (copy) for each worker process.
       */
      // Wait for the database connection to complete
      await new InitApp().initialize();

      // Now call core (expressApp)
      if ($.config.type === 'express') {
        ExpressApp(); // Initialize the Express application
      }
      if ($.config.type === 'rabbit') {
        void (function (): void {
          MTProtoApp(); // Initialize the MTProto application
        })();
        // void (function (): void {
        //   RabbitApp(); // Uncomment to initialize the Rabbit application
        // })();
      }
    }
  } catch (error) {
    log.error(`Error in worker ${process.pid}:`, error); // Log any errors that occur during initialization
    die(); // Terminate the worker process
  }
}
