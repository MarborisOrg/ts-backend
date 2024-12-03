/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license MIT
 * @description This module defines TypeScript namespaces for application configuration and MongoDB document types.
 * It includes types for application settings, environment configuration, and MongoDB user and item documents.
 */

import { Document } from 'mongoose';

export namespace config_ns {
  /**
   * Type definition for application settings.
   */
  export type Settings = {
    PORT: number; // The port on which the application runs
    mysql_sv: string; // MySQL server address
    mysql_user: string; // MySQL username
    mysql_password: string; // MySQL password
    database_name: string; // Name of the database
    mysql_multipleStatements: boolean; // Flag for allowing multiple MySQL statements
    SECRET_KEY: string; // Secret key for application security
    admin_user: string; // Admin username
    admin_pass: string; // Admin password
    scriptSrc: string; // Source for scripts
    mongo_url: string; // MongoDB connection URL
    tc_book_name: string; // Name of the book for the application
    database_use: string; // Database type to use (e.g., 'mongo' or 'mysql')
    ALLOWED_IPS: string[]; // List of allowed IP addresses
  };

  /**
   * Type definition for environment configuration.
   */
  export type IEnvConfig = {
    readonly PORT: number; // The port on which the application runs
    readonly mysql_sv: string; // MySQL server address
    readonly mysql_user: string; // MySQL username
    readonly mysql_password: string; // MySQL password
    readonly database_name: string; // Name of the database
    readonly mysql_multipleStatements: boolean; // Flag for allowing multiple MySQL statements
    readonly mongo_url: string; // MongoDB connection URL
    readonly tc_book_name: string; // Name of the book for the application
    readonly database_use: 'mongo' | 'mysql'; // Database type to use
  };

  /**
   * Type definition for the overall configuration object.
   */
  export type IConfig = {
    readonly env: IEnvConfig; // Environment configuration
  } & {
    readonly getEnv: () => IEnvConfig; // Method to get the environment configuration
  };
}

export namespace mongo_ns {
  /**
   * Type definition for a user document in MongoDB.
   */
  export type IUser = {
    readonly [x: string]: any; // Allow additional properties
    readonly name: string; // User's name
    readonly email: string; // User's email
    readonly ownedItems: ReadonlyArray<string>; // List of owned item IDs
  } & Document;

  /**
   * Type definition for an item document in MongoDB.
   */
  export type IItem = {
    readonly [x: string]: any; // Allow additional properties
    readonly title: string; // Title of the item
    readonly description: string; // Description of the item
    readonly owners: ReadonlyArray<string>; // List of owner IDs
    id: number; // Unique identifier for the item
  } & Document;

  /**
   * Type definition for ownership records in MongoDB.
   */
  export type IOwnership = {
    readonly [x: string]: any; // Allow additional properties
    readonly user: string; // User ID of the owner
    readonly item: string; // Item ID of the owned item
    readonly createdAt: Date; // Date when the ownership was created
  } & Document;
}
