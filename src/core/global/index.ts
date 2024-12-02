import { assert } from '#core/utils/assert';
import { die } from '#core/utils/die';
import { Logger } from '#core/utils/log';
import { quit } from '#core/utils/quit';

export class InitGlobal {
  public constructor() {
    this.initialize();
  }

  private initialize(): void {
    const loggerInstance = new Logger();
    globalThis.log = loggerInstance.getLogger();
    // die/quit need log
    globalThis.die = die;
    globalThis.quit = quit;
    // assert need quit, log
    globalThis.assert = assert;
  }
}
