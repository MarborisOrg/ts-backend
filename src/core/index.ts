import Forker from './cluster/forker.js';
import { InitApp } from './init/app.js';

import RabbitApp from '#app/rabbit/index';
import ExpressApp from '#app/server/index';

export default async function (): Promise<void> {
  await Forker(app, !$.config.dev); // , 2, 2
  async function app(): Promise<void> {
    try {
      /**
       * init file for app (express app)
       * repeated on fork (copy)
       */
      // Wait for the database connection to complete
      await new InitApp().initialize();

      // Now call core (expressApp)
      if ($.config.type === 'express') {
        ExpressApp();
      }
      if ($.config.type === 'rabbit') {
        RabbitApp();
      }
    } catch (error) {
      log.error(`Error in worker ${process.pid}:`, error);
      die();
    }
  }
}
