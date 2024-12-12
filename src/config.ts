import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { Singleton } from './core';

type Config = Record<string, any>;

// Base Configuration Manager
@Singleton
export class ConfigManager {
  private args: Config;
  private envConfig: Record<string, any> = {};

  public constructor() {
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
      } catch {
        /* empty */
      }

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
