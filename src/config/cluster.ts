import os from "os";

export const numWorkers = os.cpus().length;
export const maxRetries = 5; // Maximum number of retries for restarting a worker
