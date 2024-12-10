import * as dotenv from 'dotenv';
import fs from 'fs';
import Joi from 'joi';
import path from 'path';

import { config } from '#app.main.arg';
import { whereIsHere } from '#app.where';

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

/**
 * Class responsible for loading environment variables and validating them.
 */
export class EnvService {
  public defaults: config_ns.IEnvConfig = {
    PORT: 8080,
    mysql_sv: 'localhost',
    mysql_user: 'root',
    mysql_password: '',
    database_name: 'sp',
    mongo_url: 'mongodb://localhost:27017/',
    tc_book_name: 'tc',
    database_use: 'mongo',
    apiId: 27316802,
    apiHash: '00892a1c8cbd812a3bbbf916bcd861b4',
    tbot_token: '7598087160:AAH9-txmznB3ExxUlT0abZUoTu8y7z0aN2Y',
    amqp: 'amqp://localhost',
  };

  public config: config_ns.Settings = { ...this.defaults };

  public init(): Promise<void> {
    return new Promise((resolve) => {
      const envFilePath = this.findEnvFileInSubdirectories(whereIsHere());

      if (envFilePath) {
        dotenv.config({ path: envFilePath });
      } else {
        assert('.env file not found.'); // Log error
        return;
      }

      const schema = Joi.object({
        ...Object.keys(this.defaults).reduce<Record<string, Joi.Schema>>(
          (acc, key) => {
            acc[key] = Joi.any().custom((value, _helpers) => {
              if (value === undefined || value === '') {
                return this.defaults[key];
              }
              return value;
            });
            return acc;
          },
          {}
        ),
        SECRET_KEY: Joi.string().min(10).required(),
        admin_user: Joi.string().min(1).max(255).required(),
        admin_pass: Joi.string().min(6).required(),
        ALLOWED_IPS: Joi.string().default('').allow(''),
      }).unknown();

      const { error, value } = schema.validate(process.env);

      if (error) {
        assert(`Configuration error: ${error.message}`);
        return;
      }

      Object.assign(this.config, value);
      this.config.ALLOWED_IPS = value.ALLOWED_IPS.split(',').filter(Boolean); // Split allowed IPs into an array

      resolve();
    });
  }

  /**
   * Searches for a .env file in the specified directory and its subdirectories.
   * The filename is determined based on the development mode.
   *
   * @param {string} startDir - The directory to start the search from.
   * @returns {string | null} - The path to the found .env file or null if not found.
   */
  private findEnvFileInSubdirectories = (startDir: string): string | null => {
    const files = fs.readdirSync(startDir); // Read the contents of the directory
    const envPath = config.dev ? '.env.dev' : '.env'; // Determine the .env file name based on the environment

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

// Export a singleton instance of the EnvService class
export default new EnvService();
