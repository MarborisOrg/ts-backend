/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 */

/**
 * init file for index (current file)
 */
await import('#init/index');

/**
 * mode
 */
if (lib.getMode() === 'production') {
  clusterForker();
} else {
  app();
}

async function clusterForker() {
  /**
   * cluster forker
   */

  const startWorker = (retries = 0) => {
    const worker = lib.cluster.fork();

    worker.on('exit', (code: number, signal: any) => {
      log.info(
        `Worker ${worker.process.pid} died (code: ${code}, signal: ${signal}).`,
      );

      if (code !== 0 && retries < lib.maxRetries) {
        log.info(
          `Restarting worker ${worker.process.pid}... Attempt ${retries + 1}`,
        );
        setTimeout(() => startWorker(retries + 1), 1000); // Delay before restarting
      } else if (retries >= lib.maxRetries) {
        log.error(
          `Worker ${worker.process.pid} has exited with code ${code} after ${lib.maxRetries} attempts. Not restarting.`,
        );
      }
    });
  };

  if (lib.cluster.isPrimary) {
    log.info(`Primary process ${process.pid} is running`);

    Array.from({ length: lib.numWorkers }, (_, i) => startWorker(i + 1)); // [for] replace with Array
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
    const { default: init } = await import('#init/app');
    init().then(function () {
      // Wait for the database connection to complete
      lib.expressApp(); // Now call expressApp
    });
  } catch (error) {
    log.error(`Error in worker ${process.pid}:`, error);
    die();
  }
}


export { };
/**
 * اضافه کردن سورس های پایدار و ورژن بندی پایدار برای هسته
 * قابلیت اضافه کردن ماژول ها به هسته با قابلیت خطا پذیری برای هر ماژول
 *
 * اضافه کردن فورکر برای هر ورژن بندی بسته به تعداد و حداکثر
 */
