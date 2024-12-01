/**
 * @link https://github.com/S-MRB-S
 *
 * @author MRB
 *
 */

import { InitCore } from '#core/init/index';
import { InitLib } from '#lib/index';

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
  new (class {
    public constructor() {
      void this.initialize();
    }

    public async initialize(): Promise<void> {
      console.log('Application is initializing...');

      /**
       * init global lib
       */
      await new InitLib().init();

      await this.start();
    }

    #run(): void {
      console.log('Running the application...');
      $.core();
    }

    public async start(): Promise<void> {
      /**
       * init file for index (current file)
       */
      await new InitCore().init();
      this.#run();
    }
  })();
})();
