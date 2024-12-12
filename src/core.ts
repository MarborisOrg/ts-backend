import './console.log.js'

import { AmqpManager } from './amqp.js'
import { ConfigManager } from './config.js'
import { cwd as CWD } from './cwd.js'
import { CustomLogger, LoggerManager } from './logger.js'

// Core Application
export abstract class Core {
  protected config: ConfigManager
  protected logger: CustomLogger
  protected amqpManager: AmqpManager

  public constructor() {
    if (new.target === Core) {
      throw new Error('Core cannot be instantiated directly. Please extend it.')
    }
    globalThis.cwd = CWD
    this.config = new ConfigManager()
    this.logger = new LoggerManager().getLogger()
    globalThis.log = this.logger
    globalThis.configs = this.config
    this.amqpManager = new AmqpManager()

    this.Main()
  }

  protected abstract Main(): void
}

// Test
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
;(class extends Core {
  public Main(): void {
    console.log('[__info__] Application is starting...')
    this.logger.info('Debug mode')
  }
})
