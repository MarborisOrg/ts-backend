/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module provides a function to free database connections for both MongoDB and MySQL.
 * It ensures that memory is released properly and prevents multiple calls to the cleanup process.
 */

import { freeMongo } from './mongo/free/index.js';
import { freeMysql } from './mysql/free/index.js';

let safeCleanBool = 0; // Flag to prevent multiple cleanup calls

/**
 * Frees database connections for MongoDB and MySQL.
 * This function ensures that memory is released properly and logs warnings or errors as necessary.
 *
 * @returns A Promise that resolves when the cleanup process is complete.
 */
export async function freeDatabases(): Promise<void> {
  // Check if cleanup has already been initiated
  if (safeCleanBool === 1) {
    echo('warn: Memory release failed.'); // Log a warning if cleanup was already attempted
    return; // Exit the function to prevent further execution
  }

  safeCleanBool = 1; // Set the flag to indicate cleanup is in progress
  try {
    echo('warn: free databases connection!'); // Log the start of the cleanup process
    void freeMysql(); // Free MySQL connections (fire and forget)
    await freeMongo(); // Await the completion of freeing MongoDB connections
  } catch (error) {
    echo('error: [core] ERR when free connections: ' + error); // Log any errors encountered during cleanup
  }
}
