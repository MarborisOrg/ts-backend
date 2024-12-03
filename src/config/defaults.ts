/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module defines configuration classes for managing environment settings.
 * It implements the IEnvConfig and IConfig interfaces to provide structured access to configuration values.
 */

import { config_ns } from '#ts/interfaces';

/**
 * Class representing the environment configuration.
 * Implements the IEnvConfig interface to ensure all required properties are defined.
 */
class EnvConfig implements config_ns.IEnvConfig {
  public readonly PORT: number; // The port on which the application runs
  public readonly mysql_sv: string; // MySQL server address
  public readonly mysql_user: string; // MySQL username
  public readonly mysql_password: string; // MySQL password
  public readonly database_name: string; // Name of the database
  public readonly mysql_multipleStatements: boolean; // Flag for allowing multiple MySQL statements
  public readonly mongo_url: string; // MongoDB connection URL
  public readonly tc_book_name: string; // Name of the book for the application
  public readonly database_use: 'mongo' | 'mysql'; // Database type to use

  /**
   * Constructor to initialize default configuration values.
   */
  public constructor() {
    this.PORT = 8080; // Default port
    this.mysql_sv = 'localhost'; // Default MySQL server
    this.mysql_user = 'root'; // Default MySQL user
    this.mysql_password = ''; // Default MySQL password
    this.database_name = 'sp'; // Default database name
    this.mysql_multipleStatements = false; // Default for multiple statements
    this.mongo_url = 'mongodb://localhost:27017/'; // Default MongoDB URL
    this.tc_book_name = 'tc'; // Default book name
    this.database_use = 'mongo'; // Default database type
  }
}

/**
 * Class representing the overall application configuration.
 * Implements the IConfig interface to provide access to environment settings.
 */
class Config implements config_ns.IConfig {
  public readonly env: config_ns.IEnvConfig; // Environment configuration

  /**
   * Constructor to initialize the environment configuration.
   */
  public constructor() {
    this.env = new EnvConfig(); // Create a new instance of EnvConfig
  }

  /**
   * Method to retrieve the environment configuration.
   *
   * @returns {config_ns.IEnvConfig} The environment configuration object.
   */
  public getEnv(): config_ns.IEnvConfig {
    return this.env; // Return the environment configuration
  }
}

// Export a singleton instance of the Config class
export default new Config();

// Export a constant message for blocked IP access
export const blockIpMsg = 'permission denied';
