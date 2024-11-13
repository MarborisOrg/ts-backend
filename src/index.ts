/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 */

import { expressApp } from "#app";
import cluster from "cluster";
import os from "os";

/**
 * init file for index (current file)
 */
await import("#init/index")

/**
 * cluster forker
 */
const numCPUs = os.cpus().length;
const maxRetries = 5; // Maximum number of retries for restarting a worker

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

  for (let i = 1; i <= numCPUs; i++) {
    startWorker();
  }
} else {
  (async function () {
    try {
      /**
       * init file for app (express app)
       * repeated on fork (copy)
       */
      const { default: init } = await import("#init/app");
      init().then(function(){ // Wait for the database connection to complete
        expressApp(); // Now call expressApp
      });
    } catch (error) {
      log.error(`Error in worker ${process.pid}:`, error);
      die();
    }
  })();
}
