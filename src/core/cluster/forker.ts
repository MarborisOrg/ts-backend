
export default async function(App: () => Promise<void>) {
  /**
   * cluster forker
   */

  const startWorker = (retries = 0) => {
    const worker = $.cluster.fork();

    worker.on('exit', (code: number, signal: any) => {
      log.info(
        `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}).`,
      );

      if (code !== 0 && retries < $.maxRetries) {
        log.info(
          `Restarting worker ${worker.process.pid}... Attempt ${retries + 1}`,
        );
        setTimeout(() => startWorker(retries + 1), 1000); // Delay before restarting
      } else if (retries >= $.maxRetries) {
        log.error(
          `Worker ${worker.process.pid} has exited with code ${code} after ${$.maxRetries} attempts. Not restarting.`,
        );
      }
    });
  };

  if ($.cluster.isPrimary) {
    log.info(`Primary process ${process.pid} is running`);

    Array.from({ length: $.numWorkers }, (_, i) => startWorker(i + 1)); // [for] replace with Array
  } else {
    App();
  }
}
