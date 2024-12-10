/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module serves as the main entry point for the application. It initializes the application
 * by forking worker processes and setting up the necessary services based on the configuration.
 * It supports different application types, including Express and Rabbit.
 */

// import { InitApp } from './core.main.init.js';

/**
 * Main entry point for the application.
 * This function initializes the application by forking worker processes and setting up the necessary services.
 *
 * @returns A Promise that resolves when the application has been successfully initialized.
 * @throws Will log an error if the initialization fails.
 */
export default async function (): Promise<void> {
  // try {
  //   /**
  //    * Init file for app (express app)
  //    * This function is repeated on fork (copy) for each worker process.
  //    */
  //   // // Now call core (expressApp)
  //   // if ($.config.type === 'server') {
  //   //   // Wait for the database connection to complete
  //   await new InitApp().initialize();
  //   //   ExpressApp(); // Initialize the Express application
  //   // }
  //   // if ($.config.type === 'rabbit') {
  //   //   void (function (): void {
  //   //     RabbitApp(); // Uncomment to initialize the Rabbit application
  //   //   })();
  //   // }
  // } catch (error) {
  //   log.error(`Error in worker ${process.pid}:`, error); // Log any errors that occur during initialization
  //   die(); // Terminate the worker process
  // }
}
