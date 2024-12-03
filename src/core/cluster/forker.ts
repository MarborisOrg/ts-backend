/**
 * @author MRB
 * @license MIT
 * @link https://github.com/S-MRB-S
 *
 * This function initializes a cluster of worker processes to run the provided application.
 * It manages the lifecycle of the workers, including restarting them if they exit unexpectedly.
 *
 * @param App - A function that returns a Promise or void, representing the application to run.
 * @param run - A boolean indicating whether to start the worker processes (default is true).
 * @param maxRetries - The maximum number of times to restart a worker if it exits with an error (default is 3).
 * @param numWorkers - The number of worker processes to spawn, based on the number of CPU cores (default is the number of CPU cores).
 * @returns A Promise that resolves when the application has finished running.
 * @deprecated No longer support
 */
export default async function (
  App: () => Promise<void> | void,
  run: boolean = true,
  maxRetries: number = 3,
  numWorkers: number = $.os.cpus().length
): Promise<void> {
  if (run) {
    /**
     * Function to start a worker process and handle its exit event.
     * If the worker exits with a non-zero code, it will be restarted up to maxRetries times.
     *
     * @param retries - The current retry attempt count (default is 0).
     */
    const startWorker = (retries = 0): void => {
      const worker = $.cluster.fork(); // Fork a new worker process

      worker.on('exit', (code: number, signal: any) => {
        log.info(
          `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}).`
        );

        // Check if the worker exited with an error and if we can retry
        if (code !== 0 && retries < maxRetries) {
          log.info(
            `Restarting worker ${worker.process.pid}... Attempt ${retries + 1}`
          );
          setTimeout(() => startWorker(retries + 1), 1000); // Delay before restarting
        } else if (retries >= maxRetries) {
          log.error(
            `Worker ${worker.process.pid} has exited with code ${code} after ${maxRetries} attempts. Not restarting.`
          );
        }
      });
    };

    // Check if the current process is the primary process
    if ($.cluster.isPrimary) {
      log.info(`Primary process ${process.pid} is running`);

      // Start the specified number of worker processes
      Array.from({ length: numWorkers }, (_, i) => startWorker(i + 1)); // Create workers
    } else {
      await App(); // Run the application in the worker process
    }
  } else {
    await App(); // Run the application without starting workers
  }
}
