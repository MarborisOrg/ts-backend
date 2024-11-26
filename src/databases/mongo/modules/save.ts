import mongoose from 'mongoose';

import { DUPLICATE_ITEM } from '../codes.js';

import { mongo_ns } from '#ts/interfaces.js';

export class ItemCreate {
  private readonly itemModel;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async createItem(
    title: string,
    description: string
  ): Promise<mongo_ns.IItem | string> {
    const newItem: mongo_ns.IItem = new this.itemModel({ title, description });
    try {
      const savedItem = await newItem.save();
      return savedItem;
    } catch (error: any) {
      if (error.code === DUPLICATE_ITEM) {
        return `Error: An item with the title "${title}" already exists.`;
      } else {
        return `Error saving item: ${error instanceof Error ? error.message : error}`;
      }
    }
  }
}
