import * as dotenv from 'dotenv';
import Joi from 'joi';

import { whereIsHere } from '#helpers/whereishere';
import { findEnvFileInSubdirectories } from '#utils/env_finder';

export namespace config_ns {
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

export const defaultConfig: config_ns.IEnvConfig = {
  PORT: 8080,
  mysql_sv: 'localhost',
  mysql_user: 'root',
  mysql_password: '',
  database_name: 'sp',
  mysql_multipleStatements: false,
  mongo_url: 'mongodb://localhost:27017/',
  tc_book_name: 'tc',
  database_use: 'mongo',
  apiId: 27316802,
  apiHash: '00892a1c8cbd812a3bbbf916bcd861b4',
  tbot_token: '7598087160:AAH9-txmznB3ExxUlT0abZUoTu8y7z0aN2Y',
};

export const config: config_ns.Settings = { ...defaultConfig };

/**
 * Class responsible for loading environment variables and validating them.
 */
export class LoadEnv {
  public init(): Promise<void> {
    return new Promise((resolve) => {
      const envFilePath = findEnvFileInSubdirectories(whereIsHere());

      if (envFilePath) {
        dotenv.config({ path: envFilePath });
      } else {
        assert('.env file not found.'); // Log error
        return;
      }

      const schema = Joi.object({
        ...Object.keys(defaultConfig).reduce<Record<string, Joi.Schema>>(
          (acc, key) => {
            acc[key] = Joi.any().custom((value, _helpers) => {
              if (value === undefined || value === '') {
                return defaultConfig[key];
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

      Object.assign(config, value);
      config.ALLOWED_IPS = value.ALLOWED_IPS.split(',').filter(Boolean); // Split allowed IPs into an array

      resolve();
    });
  }
}

// Export a singleton instance of the LoadEnv class
export default new LoadEnv();
