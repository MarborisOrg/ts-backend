import mongoose from 'mongoose';

import { mongo_ns } from '#ts/interfaces.js';

export class ItemFind {
  private readonly itemModel: mongoose.Model<mongo_ns.IItem>;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async getItemByTitle(title: string): Promise<mongo_ns.IItem | string> {
    try {
      const item = await this.itemModel.findById(title);
      if (item) {
        return item;
      } else {
        return `No item found with the title "${title}".`;
      }
    } catch (error) {
      return `Error fetching item: ${error instanceof Error ? error.message : error}`;
    }
  }

  public async getAllItems(): Promise<mongo_ns.IItem[] | string> {
    try {
      const items = await this.itemModel.find();
      return items;
    } catch (error) {
      return `Error fetching item: ${error instanceof Error ? error.message : error}`;
    }
  }
}
