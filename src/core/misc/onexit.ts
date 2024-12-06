/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module handles cleanup operations for the application when it is terminated.
 * It listens for exit signals and performs necessary cleanup tasks before the application closes.
 */

import { freeCore } from '#core/free/index';

/**
 * Pauses execution for a specified number of milliseconds.
 * This function blocks the event loop, which can be useful for ensuring that cleanup tasks complete.
 *
 * @param ms - The number of milliseconds to sleep.
 */
const sleep = (ms: number): void => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    /* empty */
  }
};

// Event listener for the 'exit' event.
// This is triggered when the process is about to exit.
process.on('exit', (_code) => {
  void freeCore(); // Call the freeCore function to perform cleanup
  sleep(3000); // Wait for 3 seconds to allow for parallel cleanup tasks
  echo('core: App closed'); // Log a message indicating that the application has closed
});

// Event listener for the 'SIGINT' signal (e.g., Ctrl+C).
// This allows for graceful termination of the application.
process.on('SIGINT', (): void => quit());

// Event listener for the 'SIGTERM' signal (termination request).
// This allows for graceful termination of the application.
process.on('SIGTERM', (): void => quit());
