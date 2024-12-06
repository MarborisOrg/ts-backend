/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module checks the database configuration and returns the type of database to be used.
 * It prioritizes the environment configuration and falls back to default settings if necessary.
 */

import { config, defaultConfig } from '#config/env_get'; // Import environment configuration settings
import { DatabasesUseType } from '#ts/types'; // Import the type definition for database usage

/**
 * Checks the current database configuration and returns the database type to be used.
 *
 * @returns The type of database to be used, which can be 'mongo' or 'mysql'.
 * If the configuration is invalid, it falls back to the default database type.
 */
export default function (): DatabasesUseType {
  // Check if the configured database type is valid
  if (config.database_use === 'mongo' || config.database_use === 'mysql') {
    return config.database_use; // Return the valid database type from the configuration
  } else {
    return defaultConfig.env.database_use; // Return the default database type if the configuration is invalid
  }
}
