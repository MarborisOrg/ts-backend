/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module is responsible for establishing a connection to MongoDB
 * and ensuring the initialization of a user counter in the database if it doesn't already exist.
 */

import { UserCounter } from '../models/item.js';

export default class {
  private readonly uri: string;

  /**
   * @param uri - MongoDB connection URI (آدرس اتصال به پایگاه داده).
   */
  public constructor(uri: string) {
    this.uri = uri;
  }

  /**
   * Connects to MongoDB using the provided URI.
   * If a connection is successful, it checks for the existence of a user counter document.
   * If no such document exists, it initializes one with a sequence value of 0.
   * Logs an error and exits the process if the connection fails.
   */
  public async connect(): Promise<void> {
    try {
      await $.mongoose.connect(this.uri); // Connect to MongoDB using Mongoose.
      const initialCounter = await UserCounter.findOne(); // Check if the user counter exists.
      if (!initialCounter) {
        // Create and save a new user counter if none exists.
        await new UserCounter({ sequenceValue: 0 }).save();
      }
    } catch (error) {
      // Log connection errors and terminate the process.
      log.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}
