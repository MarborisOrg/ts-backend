/**
 * @author MRB
 * @license MIT
 * @link https://github.com/S-MRB-S
 *
 * This module provides methods to fetch items from a MongoDB database using Mongoose.
 * It includes functionalities to retrieve a single item by its ID and to fetch a paginated list of items.
 */

import mongoose from 'mongoose';

import { mongo_ns } from '#ts/interfaces.js';

export class ItemFind {
  private readonly itemModel: mongoose.Model<mongo_ns.IItem>;

  /**
   * @constructor
   * Initializes the ItemFind class with a Mongoose model for fetching items.
   * @param {mongoose.Model<mongo_ns.IItem>} itemModel - The Mongoose model for the items collection.
   */
  public constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  /**
   * Retrieves a single item by its unique ID from the database.
   * @async
   * @param {number} id - The ID of the item to fetch.
   * @returns {Promise<any>} The item if found, or a message indicating no item was found.
   * @throws Will throw an error if fetching the item fails.
   */
  public async getItemByTitle(id: number): Promise<any> {
    try {
      const item = await this.itemModel.findById(id); // Finds the item by its ID.
      if (item) {
        return item; // Returns the item if found.
      } else {
        return `No item found with the id "${id}".`; // Message if no item is found.
      }
    } catch (error) {
      assert(
        `Error fetching item: ${error instanceof Error ? error.message : error}`,
        true // Handles errors during the fetch process.
      );
    }
  }

  /**
   * Retrieves all items from the database with optional pagination.
   * @async
   * @param {number} [limit=10] - The maximum number of items to retrieve per page. Default is 10.
   * @param {number} [page=1] - The page number to retrieve. Default is the first page.
   * @returns {Promise<any>} A list of items retrieved from the database.
   * @throws Will throw an error if fetching the items fails.
   */
  public async getAllItems(limit: number = 10, page: number = 1): Promise<any> {
    try {
      const query = this.itemModel.find(); // Base query to fetch items.

      if (limit > 0) {
        query.limit(limit); // Limits the number of items if a valid limit is provided.
      }

      if (page > 0) {
        query.skip((page - 1) * (limit > 0 ? limit : 10)); // Skips items for pagination.
      }

      const items = await query.lean(); // Fetches items as plain JavaScript objects.

      return items; // Returns the list of items.
    } catch (error) {
      assert(
        `Error fetching items: ${error instanceof Error ? error.message : error}`,
        true // Handles errors during the fetch process.
      );
    }
  }
}
