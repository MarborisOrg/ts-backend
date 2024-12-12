/* eslint-disable import/order */
/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module defines a `Counter` model to manage unique sequential IDs for items
 * and an `ItemModel` class that encapsulates the schema and model creation logic
 * for managing `Item` entities in MongoDB.
 */

import mongoose, { Document, Schema } from 'mongoose'
import { mongo_ns } from './databases/database.mongo.collection.type'

/**
 * Interface representing a Counter document in MongoDB.
 */
interface ICounter extends Document {
  sequenceValue: number // Represents the current sequence value for ID generation.
}

/**
 * Schema for the Counter model to store sequence values.
 */
const counterSchema = new Schema<ICounter>({
  sequenceValue: { type: Number, default: 0 }, // Default value for sequence is 0.
})

/**
 * MongoDB model for the Counter collection.
 * This is used to generate unique sequential IDs.
 */
export const UserCounter = mongoose.model<ICounter>('Counter', counterSchema)

/**
 * ItemModel class encapsulates the logic for defining the `Item` schema
 * and managing its associated MongoDB model.
 */
class ItemModel {
  private itemSchema: Schema // The schema defining the structure of an Item document.

  /**
   * Constructor to define the schema and setup pre-save hooks for ID generation.
   */
  public constructor() {
    this.itemSchema = new Schema<mongo_ns.IItem>({
      title: { type: String, required: true }, // Item's title, required field.
      description: { type: String, required: true }, // Item's description, required field.
      owners: [{ type: Schema.Types.ObjectId, ref: 'Ownership' }], // Array of ownership references.
      id: { type: Number, unique: true }, // Unique identifier for the item.
    })

    /**
     * Pre-save middleware to auto-generate a unique sequential ID for new items.
     */
    this.itemSchema.pre<mongo_ns.IItem>('save', async function (next) {
      if (!this.isNew) {
        // Skip ID generation for existing documents.
        return next()
      }

      try {
        // Find and update the counter to increment the sequence value.
        const counter = await UserCounter.findOneAndUpdate(
          {},
          { $inc: { sequenceValue: 1 } },
          { new: true, upsert: true } // Create a new counter document if not present.
        )

        // Assign the new sequence value as the item's ID.
        this.id = counter?.sequenceValue || 1
        next()
      } catch (error: any) {
        // Pass any errors to the next middleware.
        next(error)
      }
    })
  }

  /**
   * Returns the Mongoose model for the `Item` collection.
   * @returns {mongoose.Model<mongo_ns.IItem>} The Item model.
   */
  public getModel(): mongoose.Model<mongo_ns.IItem> {
    return mongoose.model<mongo_ns.IItem>('Item', this.itemSchema)
  }
}

/**
 * Default export of the ItemModel instance.
 * Provides access to the `Item` model.
 */
export default new ItemModel()
