import { DUPLICATE_ITEM } from "#databases/mongo/codes";
import { mongo_ns } from "#ts/interfaces.js";
import mongoose from "mongoose";

export class ItemCreate {
  private itemModel;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async createItem(
    title: string,
    descrp: string,
  ): Promise<mongo_ns.IItem | string> {
    const newItem: mongo_ns.IItem = new this.itemModel({ title, descrp });
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
