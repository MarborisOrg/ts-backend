// by MRB

import { expressApp } from "#app";
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // Updated from isMaster to isPrimary
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // we can change port here
  });
} else {
  expressApp();
}
