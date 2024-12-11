import { AmqpManager } from '#amqp';
import { ConfigManager } from '#config';
import '#console.log';
import { CustomLogger, LoggerManager } from '#logger';
import fs from 'fs';
import path from 'path';

// Utility Decorators
export function Singleton<T extends { new (...args: any[]): any }>(
  constructor: T
) {
  let instance: T | null = null;
  return class extends constructor {
    // @ts-expect-error
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

  constructor() {
    this.config = new ConfigManager();
    this.logger = new LoggerManager(
      this.getLogDir(),
      this.config.Args.debug
    ).getLogger();
    this.amqpManager = new AmqpManager();
  }

  private getLogDir(): string {
    const logDir = path.resolve(process.cwd(), 'log');
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    return logDir;
  }

  protected abstract Main(): Promise<void>;

  protected exitGracefully(): void {
    process.on('SIGINT', () => {
      this.logger.info('Shutting down gracefully.');
      process.exit(0);
    });
  }
}

// Test
(class extends Core {
  public async Main(): Promise<void> {
    console.log(
      '[__info__] H Fuck error FuckError Application is starting...'
    );
    this.logger.info('SSS');
  }
})
