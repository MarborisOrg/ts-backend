/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module checks the database configuration and returns the type of database to be used.
 * It prioritizes the environment configuration and falls back to default settings if necessary.
 */

import { DatabasesUseType } from '#databases/database.type'; // Import the type definition for database usage

/**
 * Checks the current database configuration and returns the database type to be used.
 *
 * @returns The type of database to be used, which can be 'mongo' or 'mysql'.
 * If the configuration is invalid, it falls back to the default database type.
 */
export default function (): DatabasesUseType {
  // Check if the configured database type is valid
  if (
    $.env.config.database_use === 'mongo' ||
    $.env.config.database_use === 'mysql'
  ) {
    return $.env.config.database_use; // Return the valid database type from the configuration
  } else {
    return $.env.defaults.env.database_use; // Return the default database type if the configuration is invalid
  }
}
