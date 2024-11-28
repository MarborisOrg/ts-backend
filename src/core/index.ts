import Forker from './cluster/forker.js';

import App from '#app/server/index';

export default function (): void {
  /**
   * mode
   */
  if ($.getConfig().dev) {
    void app();
  } else {
    void Forker(app);
  }

  async function app(): Promise<void> {
    try {
      /**
       * init file for app (express app)
       * repeated on fork (copy)
       */
      const { default: init } = await import('#core/init/app');
      void init().then(function () {
        // Wait for the database connection to complete
        App(); // Now call core (expressApp)
      });
    } catch (error) {
      log.error(`Error in worker ${process.pid}:`, error);
      die();
    }
  }
}
