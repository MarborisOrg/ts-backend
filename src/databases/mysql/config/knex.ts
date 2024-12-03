/**
 * @module DatabaseInitializer
 * @description
 * This module sets up and initializes a Knex.js instance for MySQL database connections.
 * It provides flexibility to connect to a specific database or use the default configuration.
 */

import knex from 'knex';

import { config } from '#config/env_get';

/**
 * @typedef {Object} DatabaseConfig
 * @property {string} client - The database client (e.g., 'mysql2').
 * @property {Object} connection - Connection details for the database.
 * @property {string} connection.host - The hostname of the database server.
 * @property {string} connection.user - The username for the database connection.
 * @property {string} connection.password - The password for the database connection.
 * @property {string} [connection.database] - The optional name of the database to connect to.
 */
export type DatabaseConfig = {
  readonly client: string;
  readonly connection: {
    readonly host: string;
    readonly user: string;
    readonly password: string;
    readonly database?: string;
  };
};

/**
 * Creates a Knex.js configuration object for MySQL connections.
 *
 * @param {string} [database=''] - The name of the database to connect to. Defaults to no database.
 * @returns {knex.Knex} A configured Knex instance.
 */
const createKnexConfig = (database: string = ''): knex.Knex<any, unknown[]> => {
  const dbConfig: DatabaseConfig = {
    client: 'mysql2', // Using the mysql2 client for better MySQL compatibility.
    connection: {
      host: config.mysql_sv, // MySQL server host from environment config.
      user: config.mysql_user, // MySQL username from environment config.
      password: config.mysql_password, // MySQL password from environment config.
      database: database || undefined, // Optional database name.
    },
  };

  return knex(dbConfig);
};

/**
 * @var {knex.Knex} mdb
 * Holds the initialized Knex instance for database queries.
 */
export let mdb: knex.Knex<any, unknown[]>;

/**
 * Initializes the `mdb` variable with a Knex instance.
 *
 * @param {string} [databaseName=''] - The name of the database to connect to. Defaults to no database.
 */
export function initializeMdb(databaseName: string = ''): void {
  mdb = createKnexConfig(databaseName);
}
