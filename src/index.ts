/**
 * @link https://github.com/S-MRB-S
 *
 * @author MRB
 *
 */

import { InitCore } from '#core/init/index';
import { InitLib } from '#lib/index';
import { InitEcho } from '#utils/echo';

/**
 * اضافه کردن سورس های پایدار و ورژن بندی پایدار برای هسته
 * قابلیت اضافه کردن ماژول ها به هسته با قابلیت خطا پذیری برای هر ماژول
 *
 * اضافه کردن فورکر برای هر ورژن بندی بسته به تعداد و حداکثر
 */

// --------------------------------------------------------------
// init libs, init and start core
// --------------------------------------------------------------
void ((): void => {
  new (class extends InitEcho {
    public constructor() {
      super();
      void this.initialize();
    }

    public async initialize(): Promise<void> {
      echo('info: Application is initializing...');

      /**
       * init global lib
       */
      try {
        await new InitLib().init();

        void this.start();
      } catch (err) {
        console.error(err);
      }
    }

    #run(): void {
      echo('info: Running the application...');
      $.core();
    }

    public start(): void {
      /**
       * init file for index (current file)
       */
      new InitCore();
      this.#run();
    }
  })();
})();
