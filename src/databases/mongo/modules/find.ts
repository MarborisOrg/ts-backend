import { mongo_ns } from "#ts/interfaces.js";
import mongoose from "mongoose";

export class ItemFind {
  private itemModel: mongoose.Model<mongo_ns.IItem>;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async getItemByTitle(title: string): Promise<mongo_ns.IItem | string> {
    try {
      const item = await this.itemModel.findOne({ title });
      if (item) {
        return item;
      } else {
        return `No item found with the title "${title}".`;
      }
    } catch (error) {
      return `Error fetching item: ${error instanceof Error ? error.message : error}`;
    }
  }
}
