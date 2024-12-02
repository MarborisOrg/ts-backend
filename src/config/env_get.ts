import * as dotenv from 'dotenv';
import Joi from 'joi';

import df_config from './defaults.js';

import { config_ns } from '#ts/interfaces';
import { findEnvFileInSubdirectories } from '#utils/env_finder';

export const config: config_ns.Settings = {} as config_ns.Settings;

export class LoadEnv {
  public init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const envFilePath = findEnvFileInSubdirectories(process.cwd());

      if (envFilePath) {
        dotenv.config({ path: envFilePath });
      } else {
        log.error('.env file not found in any subdirectories.');
        quit();
        reject();
        return;
      }

      const schema = Joi.object({
        PORT: Joi.number().default(df_config.env.PORT),
        mysql_sv: Joi.string().min(1).max(255).default(df_config.env.mysql_sv),
        mysql_user: Joi.string()
          .min(1)
          .max(255)
          .default(df_config.env.mysql_user),
        mysql_password: Joi.string()
          .min(8)
          .max(255)
          .allow('') /* allow empty for Mysql password */
          .default(df_config.env.mysql_password),
        database_name: Joi.string()
          .min(1)
          .max(255)
          .default(df_config.env.database_name),
        mysql_multipleStatements: Joi.boolean().default(
          df_config.env.mysql_multipleStatements
        ),
        SECRET_KEY: Joi.string()
          .min(10)
          .required() /* no default for SECRET_KEY */,
        admin_user: Joi.string()
          .min(1)
          .max(255)
          .required() /* no default for admin user */,
        admin_pass: Joi.string()
          .min(6) /* admin password must be strong */
          .max(255)
          .required(),
        scriptSrc: Joi.string().uri().default('') /* no require */,
        mongo_url: Joi.string().uri().default(df_config.env.mongo_url),
        tc_book_name: Joi.string()
          .min(1)
          .max(255)
          .default(df_config.env.tc_book_name),
        database_use: Joi.string().valid('mongo', 'mysql').default('mongo'),
      }).unknown();

      const { error, value } = schema.validate(process.env);

      if (error) {
        log.error(`Configuration error: ${error.message}`);
        quit();
        reject();
        return;
      }

      config.PORT = value.PORT;
      config.mysql_sv = value.mysql_sv;
      config.mysql_user = value.mysql_user;
      config.mysql_password = value.mysql_password;
      config.database_name = value.database_name;
      config.mysql_multipleStatements = value.mysql_multipleStatements;
      config.SECRET_KEY = value.SECRET_KEY;
      config.admin_user = value.admin_user;
      config.admin_pass = value.admin_pass;
      config.scriptSrc = value.scriptSrc;
      config.mongo_url = value.mongo_url;
      config.tc_book_name = value.tc_book_name;
      config.database_use = value.database_use;
      config.ALLOWED_IPS = value.ALLOWED_IPS
        ? value.ALLOWED_IPS.split(',')
        : [];

      resolve();
    });
  }
}
