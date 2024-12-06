/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module handles the creation of items in a MongoDB database using Mongoose.
 * It includes functionality to create new items while managing potential duplicate entries.
 */

import mongoose from 'mongoose';

import { DUPLICATE_ITEM } from '../codes.js';

import { mongo_ns } from '#ts/interfaces.js';

export class ItemCreate {
  private readonly itemModel;

  /**
   * @constructor
   * Initializes the ItemCreate class with a Mongoose model for creating items.
   * @param {mongoose.Model<mongo_ns.IItem>} itemModel - The Mongoose model for the items collection.
   */
  public constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  /**
   * Creates a new item in the database.
   * @async
   * @param {string} title - The title of the new item.
   * @param {string} description - A brief description of the new item.
   * @returns {Promise<mongo_ns.IItem>} The newly created item object if successful.
   * @throws Will throw an error if the item title is duplicated or if saving fails.
   */
  public async createItem(title: string, description: string): Promise<any> {
    // Creates a new instance of the item with provided title and description.
    const newItem: mongo_ns.IItem = new this.itemModel({ title, description });

    try {
      // Saves the new item to the database.
      const savedItem = await newItem.save();
      return savedItem; // Returns the saved item object.
    } catch (error: any) {
      if (error.code === DUPLICATE_ITEM) {
        assert(`Error: An item with the title "${title}" already exists.`); // Handles duplicate title errors.
      } else {
        assert(
          `Error saving item: ${error instanceof Error ? error.message : error}`,
          true // Handles general errors during the save process.
        );
      }
    }
  }
}
