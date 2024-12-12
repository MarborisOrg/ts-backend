/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module provides a function to free the MongoDB connection by disconnecting from the database.
 * It ensures that the connection is properly closed and logs a success message upon completion.
 */

import mongoose from 'mongoose' // Import the mongoose library for MongoDB interactions

/**
 * Frees the MongoDB connection by disconnecting from the database.
 *
 * @returns A Promise that resolves when the disconnection is complete.
 */
export async function freeMongo(): Promise<void> {
  await mongoose.disconnect() // Disconnect from the MongoDB database
  echo('Success: Mongo now free') // Log a success message indicating the connection is freed
}
