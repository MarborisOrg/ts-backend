import Forker from './cluster/forker.js';
import { InitApp } from './init/app.js';

import ExpressApp from '#app/server/index';

export default async function (): Promise<void> {
  try {
    /**
     * init file for app (express app)
     * repeated on fork (copy)
     */
    // Wait for the database connection to complete
    await Forker(new InitApp().initialize, !$.config.dev, 2, 3);

    // Now call core (expressApp)
    if ($.config.type === 'express') {
      void Forker(ExpressApp, !$.config.dev, 2, 2);
    }
  } catch (error) {
    log.error(`Error in worker ${process.pid}:`, error);
    die();
  }
}
