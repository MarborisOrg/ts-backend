/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module provides functionality to manage and delete items in a MongoDB database
 * using the Mongoose library. It includes methods to delete specific items and drop the entire collection.
 */

import mongoose from 'mongoose';

import { mongo_ns } from '#ts/interfaces';

export class ItemDelete {
  private readonly itemModel;

  /**
   * @constructor
   * Initializes the ItemDelete class with a Mongoose model for managing items.
   * @param {mongoose.Model<mongo_ns.IItem>} itemModel - The Mongoose model for the items collection.
   */
  public constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  /**
   * Deletes an item from the database by its unique ID.
   * @async
   * @param {number} id - The ID of the item to delete.
   * @returns {Promise<string>} A success message if the item was deleted.
   * @throws Will throw an error if the itemModel is not set or if deletion fails.
   */
  public async deleteItem(id: number): Promise<any> {
    if (!this.itemModel) {
      assert('Item model is not set.', true); // Ensures the item model is defined.
    }

    try {
      const result = await this.itemModel.deleteOne({ id });
      if (result.deletedCount === 0) {
        assert(`No item found with the id "${id}".`, true); // Throws an error if no matching item is found.
      }
      return `Item with the id "${id}" has been deleted.`; // Returns success message.
    } catch (error) {
      assert(
        `Error deleting item: ${error instanceof Error ? error.message : error}`,
        true // Handles any errors during the deletion process.
      );
    }
  }

  /**
   * Drops the entire collection from the database.
   * @async
   * @returns {Promise<string>} A success message if the collection is dropped.
   * @throws Will throw an error if the itemModel is not set or if dropping the collection fails.
   */
  public async dropCollection(): Promise<any> {
    if (!this.itemModel) {
      assert('Item model is not set.', true); // Ensures the item model is defined.
    }

    try {
      await this.itemModel.collection.drop(); // Drops the MongoDB collection.
      return 'Collection dropped successfully.'; // Returns success message.
    } catch (error) {
      assert(
        `Error dropping collection: ${error instanceof Error ? error.message : error}`,
        true // Handles any errors during the dropping process.
      );
    }
  }
}
