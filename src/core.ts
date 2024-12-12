import fs from 'fs';
import path from 'path';

import { AmqpManager } from './amqp';
import { ConfigManager } from './config';
import './console.log';
import { cwd as CWD } from './cwd';
import { CustomLogger, LoggerManager } from './logger';

// Utility Decorators
export function Singleton<T extends { new (...args: any[]): any }>(
  constructor: T
) {
  let instance: T | null = null;
  return class extends constructor {
    // @ts-expect-error no super needed!
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(...args: any[]) {
      if (!instance) {
        instance = new constructor(...args);
      }
      return instance as T;
    }
  };
}

export function CatchErrors(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      (this as { log: CustomLogger }).log.error(
        `${propertyKey} failed:`,
        error
      );
    }
  };
}

// Core Application
export abstract class Core {
  protected config: ConfigManager;
  protected logger: CustomLogger;
  protected amqpManager: AmqpManager;

  public constructor() {
    if (new.target === Core) {
      throw new Error(
        'Core cannot be instantiated directly. Please extend it.'
      );
    }
    globalThis.cwd = CWD;
    this.config = new ConfigManager();
    this.logger = new LoggerManager(
      this.getLogDir(),
      this.config.Args.debug
    ).getLogger();
    globalThis.log = this.logger;
    globalThis.configs = this.config;
    this.amqpManager = new AmqpManager();
  }

  private getLogDir(): string {
    const logDir = path.resolve(process.cwd(), 'log');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    return logDir;
  }

  protected abstract Main(): void;
}

// Test
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
(class extends Core {
  public Main(): void {
    console.log('[__info__] H Fuck error FuckError Application is starting...');
    this.logger.info('SSS');
  }
});
