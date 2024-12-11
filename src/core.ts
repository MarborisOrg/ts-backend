import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import url from 'url';
import winston from 'winston';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

interface CustomLogger extends winston.Logger {
  core: (message: string | object) => void;
}

type Config = {
  [key: string]: any;
};

namespace config_ns {
  export type Settings = {
    [key: string]: any; // Allow any key-value pairs
  };

  export type IEnvConfig = {
    readonly [key: string]: any; // Allow any key-value pairs
  };

  export type IConfig = {
    readonly env: IEnvConfig;
    readonly getEnv: () => IEnvConfig;
  };
}

export default abstract class {
  protected args: Config;
  private log: CustomLogger;
  private logDir: string;

  protected __1M__ = 1 * 1024 * 1024;
  protected __05M__ = 0.5 * 1024 * 1024;
  protected logFiles: Record<string, number> = {
    'combined.log': this.__1M__,
    'error.log': this.__05M__,
    'core.log': this.__05M__,
  };

  public env_config: config_ns.Settings = {};

  public constructor() {
    try {
      const argv = yargs(hideBin(process.argv)).options({
        dev: {
          type: 'boolean',
          alias: 'd',
          describe: 'Enable developer mode',
        },
        debug: {
          type: 'boolean',
          alias: 'D',
          describe: 'Enable debug mode',
        },
        type: {
          type: 'string',
          alias: 't',
          choices: ['server', 'rabbit', 'database'],
          describe: 'Specify the type of application',
        },
        init: {
          type: 'boolean',
          alias: 'i',
          describe: 'Initialize the application',
        },
        https: {
          type: 'boolean',
          alias: 'h',
          describe: 'Enable HTTPS',
        },
        anchor: {
          type: 'boolean',
          alias: 'a',
          describe: 'Enable anchor',
        },
        where: {
          type: 'boolean',
          alias: 'w',
          describe: 'Enable where',
        },
        rcolor: {
          type: 'boolean',
          alias: 'r',
          describe: 'Enable rcolor',
        },
        rabbit: {
          type: 'string',
          alias: 'R',
          choices: ['rec', 'send'],
          describe: 'Specify the type of rabbit application',
        },
        queue: {
          type: 'string',
          describe: 'Specify the queue channel for rabbit',
        },
      }).argv as unknown as Config;

      if (
        argv.init &&
        (argv.dev ||
          argv.debug ||
          argv.type !== 'server' ||
          argv.anchor ||
          argv.where)
      ) {
        throw new Error('The --init flag cannot be used with any other flags.');
      }
      if (argv.where && (argv.dev || argv.debug || argv.type !== 'server')) {
        throw new Error(
          'The --where flag cannot be used with any other flags.'
        );
      }
      if (argv.type === 'rabbit' && !argv.queue) {
        throw new Error('Give a queue channel for rabbit');
      }

      this.args = {
        ...argv,
      };

      console.log(`------------------------------------------`);
      console.log(`Configuration: ${JSON.stringify(this.args, null, 2)}`);
      console.log(`------------------------------------------`);

      this.logDir = this.whereIsHere('log');
      this.make(this.logDir);

      this.echo('Info: Load logger!');

      const LogLevels = {
        core: 0,
        error: 1,
        warn: 2,
        debug: 3,
        info: 4,
      };

      const formatTimestamp = (): string => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };

        const formattedDate = date.toLocaleString('sv-SE', options);
        return formattedDate
          .replace(' ', 'T')
          .replace('T', ' ')
          .substring(0, 19);
      };

      const customFormat = winston.format.printf(
        ({ timestamp, level, message }) => {
          let messageString: string;

          if (typeof message === 'string') {
            messageString = message;
          } else {
            messageString = JSON.stringify(message);
          }

          if (messageString.length > 250) {
            messageString = messageString.substring(0, 250) + '...';
          }

          const msg = `${timestamp} ${level}: ${messageString}`;
          this.echo(msg);

          return msg;
        }
      );

      const createFileTransport = (
        level: keyof typeof LogLevels,
        filename: string
      ): winston.transports.FileTransportInstance => {
        return new winston.transports.File({
          filename: path.join(this.logDir, filename),
          level,
          handleExceptions: true,
          format: winston.format.combine(
            winston.format((info) => {
              if (info.level !== level) {
                return false;
              }
              return info;
            })()
          ),
        });
      };

      this.log = winston.createLogger({
        levels: LogLevels,
        level: 'info',
        exitOnError: false,
        format: winston.format.combine(
          winston.format.timestamp({ format: formatTimestamp }),
          winston.format.json(),
          customFormat
        ),
        transports: [
          createFileTransport('core', 'core.log'),
          createFileTransport('error', 'error.log'),
          new winston.transports.File({
            filename: path.join(this.logDir, 'combined.log'),
            level: 'info',
            handleExceptions: true,
            format: winston.format.combine(
              winston.format((info) => {
                if (info.level === 'core' || info.level === 'error') {
                  return false;
                }
                return info;
              })()
            ),
          }),
        ],
      }) as CustomLogger;

      this.log.core = (message: string | object): void => {
        this.log.log('core', { message });
      };

      if (this.args.where) {
        console.log(this.whereIsHere());
        process.exit();
      }
    } finally {
      this.process();
    }

    const envFilePath = this.findEnvFileInSubdirectories(this.whereIsHere());

    if (envFilePath) {
      dotenv.config({ path: envFilePath });
    }
    // Directly assign process.env to config
    this.env_config = { ...process.env };
  }

  protected whereIsHere(resolvePath: string = ''): string {
    let dirName: string;
    if (this.args.anchor) {
      const appDir = path.resolve(path.dirname(__filename), '../../'); // TODO()
      dirName = path.resolve(appDir, resolvePath);
    } else {
      dirName = path.resolve(process.cwd(), resolvePath);
    }
    return dirName;
  }

  protected echo(message: string, ...args: any[]): void {
    enum LogColor {
      Default = '\x1b[0m',

      Red = '\x1b[31m',
      Green = '\x1b[32m',
      Yellow = '\x1b[33m',
      Blue = '\x1b[34m',
      Magenta = '\x1b[35m',
      Cyan = '\x1b[36m',
      White = '\x1b[37m',
      Black = '\x1b[30m',

      BrightRed = '\x1b[91m',
      BrightGreen = '\x1b[92m',
      BrightYellow = '\x1b[93m',
      BrightBlue = '\x1b[94m',
      BrightMagenta = '\x1b[95m',
      BrightCyan = '\x1b[96m',
      BrightWhite = '\x1b[97m',

      LightPink = '\x1b[38;5;200m',
      LightOrange = '\x1b[38;5;214m',
      LightYellowGreen = '\x1b[38;5;190m',
      LightSkyBlue = '\x1b[38;5;153m',
      LightPurple = '\x1b[38;5;129m',
      LightTeal = '\x1b[38;5;38m',
      LightLavender = '\x1b[38;5;189m',
      LightCoral = '\x1b[38;5;196m',
      LightMint = '\x1b[38;5;82m',
      LightGold = '\x1b[38;5;220m',

      Bold = '\x1b[1m',
      Underline = '\x1b[4m',
      Inverse = '\x1b[7m',

      DarkRed = '\x1b[38;5;88m',
      DarkGreen = '\x1b[38;5;22m',
      DarkYellow = '\x1b[38;5;136m',
      DarkBlue = '\x1b[38;5;24m',
      DarkMagenta = '\x1b[38;5;125m',
      DarkCyan = '\x1b[38;5;36m',
      DarkWhite = '\x1b[38;5;250m',

      BrightOrange = '\x1b[38;5;208m',
      BrightPink = '\x1b[38;5;201m',
    }

    const getLogColor = (message: string): string => {
      const lowerCaseMessage = message.toLowerCase();

      const colorMapping: { [key: string]: string } = {
        err: LogColor.Red,
        error: LogColor.Red,
        throw: LogColor.Red,
        info: LogColor.Green,
        warn: LogColor.Yellow,
        debug: LogColor.Blue,
        success: LogColor.Cyan,
        core: LogColor.Magenta,
        critical: LogColor.BrightRed,
        notice: LogColor.BrightYellow,
        alert: LogColor.BrightMagenta,
        failure: LogColor.DarkRed,
        pending: LogColor.LightOrange,
        completed: LogColor.BrightGreen,
        test: LogColor.LightSkyBlue,
        update: LogColor.LightPurple,
      };

      if (this.args.rcolor) {
        const randomIndex = Math.floor(
          Math.random() * Object.keys(LogColor).length
        );
        return Object.values(LogColor)[randomIndex];
      }

      for (const [keyword, color] of Object.entries(colorMapping)) {
        if (lowerCaseMessage.includes(keyword)) {
          return color;
        }
      }

      return LogColor.Default;
    };

    function formatMessage(message: string, args: any[]): string {
      return args.length > 0 ? `${message} ${args.join(' ')}` : message;
    }

    if (this.args.debug) {
      const color = getLogColor(message);
      const formattedMessage = formatMessage(message, args);
      console.log(`${color}${formattedMessage}${LogColor.Default}`);
    }
  }

  protected assert(
    err: string | undefined = 'undefined error',
    doNotQuit?: boolean
  ): void {
    this.log.error(err);
    try {
      throw new Error(err);
    } finally {
      if (!doNotQuit) {
        setTimeout(() => {
          this.quit();
        }, 1300);
      }
    }
  }

  protected make(name: string): void {
    if (!fs.existsSync(name)) {
      fs.mkdirSync(name, { recursive: true });
      this.echo(`Info: Make ${name} dir!`);
    }
  }

  protected die(): void {
    this.echo('warn: [force] process exit!');
    process.exit(1);
  }

  protected quit(): void {
    this.echo('warn: process exit!');
    process.exit(0);
  }

  private process(): void {
    const sleep = (ms: number): void => {
      const end = Date.now() + ms;
      while (Date.now() < end) {
        /* empty */
      }
    };

    process.on('exit', (_code) => {
      void this.free();
      sleep(3000);
      this.echo('core: App closed');
    });

    process.on('SIGINT', (): void => this.quit());

    process.on('SIGTERM', (): void => this.quit());
  }

  protected async checkAndRenameLogFiles(): Promise<void> {
    try {
      const results = await Promise.allSettled(
        Object.entries(this.logFiles).map(([fileName, maxSize]) =>
          this.checkAndRenameFile(fileName, maxSize)
        )
      );

      results.forEach((result) => {
        if (result.status === 'rejected') {
          this.log.error('Error checking or renaming file:', result.reason);
        }
      });
    } catch (error) {
      this.log.error('Unexpected error:', error);
    }
  }

  private async checkAndRenameFile(
    fileName: string,
    maxSize: number
  ): Promise<void> {
    const logFilePath = path.join(this.logDir, fileName);

    if (!(await this.fileExists(logFilePath))) return;
    const stats = await fs.promises.stat(logFilePath);

    if (stats.size > maxSize) {
      await this.renameFileIfExists(logFilePath);
    }
  }

  private async getUniqueBackupFilePath(
    basePath: string,
    counter = 1
  ): Promise<string> {
    const backupFilePath =
      counter === 1 ? `${basePath}.bak` : `${basePath}.${counter}.bak`;

    if (await this.fileExists(backupFilePath)) {
      return this.getUniqueBackupFilePath(basePath, counter + 1);
    }

    return backupFilePath;
  }

  protected async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  protected abstract free(): Promise<void> | void;

  protected async renameFileIfExists(filePath: string): Promise<void> {
    if (await this.fileExists(filePath)) {
      const uniqueFilePath = await this.getUniqueBackupFilePath(filePath);
      await fs.promises.rename(filePath, uniqueFilePath);
      this.echo(`File renamed to: ${uniqueFilePath}`);
    }
  }

  private findEnvFileInSubdirectories = (startDir: string): string | null => {
    const files = fs.readdirSync(startDir); // Read the contents of the directory
    const envPath = this.args.dev ? '.env.dev' : '.env'; // Determine the .env file name based on the environment

    // Check if the .env file exists in the current directory
    if (files.includes(envPath)) {
      return path.join(startDir, envPath); // Return the full path if found
    }

    // Use reduce to search through files for a directory containing the .env file
    const foundPath = files.reduce<string | null>((acc, file) => {
      if (acc) return acc; // If a path has already been found, return it

      const fullPath = path.join(startDir, file); // Get the full path of the file
      const stat = fs.statSync(fullPath); // Get the file statistics

      // If the file is a directory, recursively search in that directory
      if (stat.isDirectory()) {
        return this.findEnvFileInSubdirectories(fullPath);
      }

      return null; // Return null if the file is not a directory
    }, null);

    return foundPath; // Return the found path or null if not found
  };
}
