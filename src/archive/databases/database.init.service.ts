/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module checks the current database context and initializes the appropriate database connection.
 * It supports both MongoDB and MySQL connections based on the current configuration.
 */

import cuse from './database.use.js' // Import the function to get the current database context

import MONGO from './databases/mongo/service.js' // Import the MongoDB service
import ConnectToMysql from './databases/mysql/use/index' // Import the MySQL connection service

/**
 * Initializes the database connection based on the current database context.
 *
 * @returns A Promise that resolves when the database connection has been successfully established.
 */
export default async function (): Promise<void> {
  const dbUse = cuse() // Get the current database context

  // Check the database context and initialize the corresponding database connection
  if (dbUse === 'mongo') {
    await MONGO() // Initialize MongoDB connection
  } else if (dbUse === 'mysql') {
    await ConnectToMysql() // Initialize MySQL connection
  }
}
