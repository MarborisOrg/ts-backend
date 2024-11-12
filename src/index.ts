// by MRB

import { init } from "#utils/requirements";
await init();

import { expressApp } from "#app";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

const startWorker = () => {
  const worker = cluster.fork();

  worker.on("exit", (code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}). Restarting...`
    );
    startWorker(); // Restart the worker
  });
};

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    startWorker();
  }
} else {
  (async function () {
    try {
      const { default: init } = await import("#init/index");
      await init(); // Wait for the database connection to complete
      expressApp(); // Now call expressApp
    } catch (error) {
      console.error(`Error in worker ${process.pid}:`, error);
      process.exit(1); // Exit the worker on error
    }
  })();
}
