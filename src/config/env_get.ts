/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module loads environment variables from a .env file and validates them using Joi.
 * It initializes the application configuration based on the loaded environment variables.
 */

import * as dotenv from 'dotenv';
import Joi from 'joi';

import df_config from './defaults.js';

import { config_ns } from '#ts/interfaces';
import { findEnvFileInSubdirectories } from '#utils/env_finder';

// Initialize an empty configuration object
export const config: config_ns.Settings = {} as config_ns.Settings;

/**
 * Class responsible for loading environment variables and validating them.
 */
export class LoadEnv {
  /**
   * Initializes the loading of environment variables.
   *
   * @returns {Promise<void>} A promise that resolves when the environment variables are loaded and validated.
   */
  public init(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Find the .env file in the current directory or its subdirectories
      const envFilePath = findEnvFileInSubdirectories(process.cwd());

      if (envFilePath) {
        // Load the environment variables from the found .env file
        dotenv.config({ path: envFilePath });
      } else {
        log.error('.env file not found in any subdirectories.'); // Log error if .env file is not found
        quit(); // Exit the application
        reject(); // Reject the promise
        return;
      }

      // Define the schema for validating environment variables
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

      // Validate the loaded environment variables against the schema
      const { error, value } = schema.validate(process.env);

      if (error) {
        log.error(`Configuration error: ${error.message}`); // Log validation error
        quit(); // Exit the application
        reject(); // Reject the promise
        return;
      }

      // Assign validated values to the config object
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
        : []; // Split allowed IPs into an array

      resolve(); // Resolve the promise when loading is complete
    });
  }
}
