/**
 * @module FreeMySQL
 * @description
 * This module provides a function to release the MySQL connection managed by Knex.js.
 */

import { mdb } from '../config/knex.js'

/**
 * Frees the MySQL connection by destroying the Knex.js instance.
 * This ensures proper cleanup of resources when the connection is no longer needed.
 *
 * If the connection (`mdb`) is defined, it will be destroyed.
 * A success message is logged upon completion.
 *
 * @returns {Promise<void>} Resolves once the connection is destroyed.
 */
export async function freeMysql(): Promise<void> {
  if (mdb != undefined) {
    await mdb.destroy() // Properly destroy the Knex instance.
  }
  echo('Success: Mysql now free') // Log a success message.
}
