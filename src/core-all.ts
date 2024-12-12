import { Channel, connect, Connection } from 'amqplib';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import './console.log';

// Type Definitions
interface CustomLogger extends winston.Logger {
  core: (message: string | object) => void;
}

type Config = Record<string, any>;

// Utility Decorators
function Singleton<T extends { new (...args: any[]): any }>(constructor: T) {
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

function CatchErrors(
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

// Base Configuration Manager
@Singleton
class ConfigManager {
  private args: Config;
  private envConfig: Record<string, any> = {};

  constructor() {
    this.args = this.parseArgs();
    this.loadEnvFile();
  }

  private parseArgs(): Config {
    return yargs(hideBin(process.argv))
      .options({
        dev: { type: 'boolean', alias: 'd', describe: 'Enable developer mode' },
        debug: { type: 'boolean', alias: 'D', describe: 'Enable debug mode' },
        queue: {
          type: 'string',
          describe: 'Specify the queue channel for rabbit',
        },
      })
      .parseSync() as Config;
  }

  private loadEnvFile(): void {
    const envFilePath = this.findEnvFile();
    if (envFilePath) dotenv.config({ path: envFilePath });
    this.envConfig = { ...process.env };
  }

  private findEnvFile(): string | null {
    const envFileName = this.args.dev ? '.env.dev' : '.env';
    let currentDir = process.cwd();

    while (currentDir) {
      const possiblePath = path.join(currentDir, envFileName);
      try {
        if (fs.existsSync(possiblePath)) {
          return possiblePath;
        }
      } catch {}

      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) break;
      currentDir = parentDir;
    }

    return null;
  }

  public get Args(): Config {
    return this.args;
  }

  public get EnvConfig(): Record<string, any> {
    return this.envConfig;
  }
}

// Logger Manager
@Singleton
class LoggerManager {
  private logger: CustomLogger;

  constructor(logDir: string, debug: boolean) {
    if (!logDir || typeof logDir !== 'string') {
      throw new TypeError('Invalid log directory provided.');
    }

    const logLevels = { core: 0, error: 1, warn: 2, debug: 3, info: 4 };

    const createFileTransport = (
      level: keyof typeof logLevels,
      fileName: string
    ) =>
      new winston.transports.File({
        filename: path.join(logDir, fileName),
        level,
      });

    const customTimestampFormat = winston.format.printf(
      ({ timestamp, level, message }) => {
        const customTimeMsg = `[${timestamp}] ${level}: '${message}'`;
        if (debug) {
          console.log(customTimeMsg);
        }
        return customTimeMsg;
      }
    );

    this.logger = winston.createLogger({
      levels: logLevels,
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => new Date().toLocaleString(),
        }),
        customTimestampFormat
      ),
      transports: [
        createFileTransport('core', 'core.log'),
        createFileTransport('error', 'error.log'),
        createFileTransport('info', 'combined.log'),
      ],
    }) as CustomLogger;

    this.logger.core = (message: string | object) =>
      this.logger.log('core', message);
  }

  public getLogger(): CustomLogger {
    return this.logger;
  }
}

// AMQP Manager
class AmqpManager {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  @CatchErrors
  public async connect(amqpUrl: string): Promise<void> {
    this.connection = await connect(amqpUrl);
    this.channel = await this.connection.createChannel();
  }

  @CatchErrors
  public async close(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  public getChannel(): Channel | null {
    return this.channel;
  }
}

// Core Application
abstract class Core {
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
      '[__info__] H Fuck error fuckerror FuckError Application is starting...'
    );
    this.logger.info('SSS');
  }
});
