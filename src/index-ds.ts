/**
 * MRB
 * Dynamic Scaling
 */

/*
import "#utils/requirements";
await import("#utils/global/index");

import { expressApp } from "#app";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;
const maxWorkers = numCPUs * 2; // Maximum number of workers
const minWorkers = numCPUs; // Minimum number of workers
let currentWorkers = minWorkers;

const startWorker = () => {
  const worker = cluster.fork();

  worker.on("exit", (code, signal) => {
    log.info(`Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}).`);
    if (code !== 0) {
      log.info(`Restarting worker ${worker.process.pid}...`);
      startWorker();
    }
  });
};

const scaleWorkers = () => {
  const load = getServerLoad(); // Implement this function to get the current load

  if (load > 75 && currentWorkers < maxWorkers) {
    log.info(`Scaling up: Current load is ${load}%. Adding a new worker.`);
    startWorker();
    currentWorkers++;
  } else if (load < 25 && currentWorkers > minWorkers) {
    log.info(`Scaling down: Current load is ${load}%. Removing a worker.`);
    const workerToKill = getWorkerToKill(); // Implement this function to get a worker to kill
    if (workerToKill) {
      workerToKill.kill();
      currentWorkers--;
    }
  }
};

if (cluster.isPrimary) {
  log.info(`Primary process ${process.pid} is running`);

  for (let i = 0; i < currentWorkers; i++) {
    startWorker();
  }

  setInterval(scaleWorkers, 5000); // Check load every 5 seconds
} else {
  (async function () {
    try {
      const { default: init } = await import("#init/index");
      await init(); // Wait for the database connection to complete
      expressApp(); // Now call expressApp
    } catch (error) {
      log.error(`Error in worker ${process.pid}:`, error);
      process.exit(1); // Exit with error code
    }
  })();
}

*/