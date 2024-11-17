/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 */

import cluster from "cluster";

import { maxRetries, numWorkers } from "#config/cluster";
import { expressApp } from "#core/app";
import { getMode } from "#utils/mode";

/**
 * init file for index (current file)
 */
await import("#init/index");

/**
 * mode
 */
if (getMode() === "production") {
  clusterForker();
} else {
  app();
}

async function clusterForker() {
  /**
   * cluster forker
   */

  const startWorker = (retries = 0) => {
    const worker = cluster.fork();

    worker.on("exit", (code, signal) => {
      log.info(
        `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}).`,
      );

      if (code !== 0 && retries < maxRetries) {
        log.info(
          `Restarting worker ${worker.process.pid}... Attempt ${retries + 1}`,
        );
        setTimeout(() => startWorker(retries + 1), 1000); // Delay before restarting
      } else if (retries >= maxRetries) {
        log.error(
          `Worker ${worker.process.pid} has exited with code ${code} after ${maxRetries} attempts. Not restarting.`,
        );
      }
    });
  };

  if (cluster.isPrimary) {
    log.info(`Primary process ${process.pid} is running`);

    // eslint-disable-next-line functional/no-loop-statement, functional/no-let
    for (let i = 1; i <= numWorkers; i++) {
      startWorker();
    }
  } else {
    app();
  }
}

async function app() {
  try {
    /**
     * init file for app (express app)
     * repeated on fork (copy)
     */
    const { default: init } = await import("#init/app");
    init().then(function () {
      // Wait for the database connection to complete
      expressApp(); // Now call expressApp
    });
  } catch (error) {
    log.error(`Error in worker ${process.pid}:`, error);
    die();
  }
}
