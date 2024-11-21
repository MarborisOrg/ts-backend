import Forker from './cluster/forker.js';

import App from '#app/index';

export default function () {
  /**
   * mode
   */
  if ($.getMode() === 'production') {
    Forker(app);
  } else {
    app();
  }

  async function app() {
    try {
      /**
       * init file for app (express app)
       * repeated on fork (copy)
       */
      const { default: init } = await import('#core/init/app');
      init().then(function () {
        // Wait for the database connection to complete
        App(); // Now call core (expressApp)
      });
    } catch (error) {
      log.error(`Error in worker ${process.pid}:`, error);
      die();
    }
  }
}
