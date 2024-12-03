import Forker from './cluster/forker.js';
import { InitApp } from './init/app.js';

// import RabbitApp from '#app/rabbit/index';
import MTProtoApp from '#app/rabbit/mtproto/index';
import ExpressApp from '#app/server/index';

export default async function (): Promise<void> {
  try {
    await Forker(app, !$.config.dev); // , 2, 2
    async function app(): Promise<void> {
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
        void (function (): void {
          MTProtoApp();
        })();
        // void (function (): void {
        //   RabbitApp();
        // })();
      }
    }
  } catch (error) {
    log.error(`Error in worker ${process.pid}:`, error);
    die();
  }
}
