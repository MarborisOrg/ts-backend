import { mongo_ns } from "#ts/interfaces.js";
import { DUPLICATE_ITEM } from "../codes.js";
import mongoose from "mongoose";

export class ItemCreate {
  private itemModel;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async createItem(title: string, descrp: string) {
    const newItem: mongo_ns.IItem = new this.itemModel({ title, descrp });
    try {
      const savedItem = await newItem.save();
      console.log("Item saved:", savedItem);
    } catch (error: any) {
      if (error.code === DUPLICATE_ITEM) {
        console.error(
          `Error: An item with the title "${title}" already exists.`,
        );
      } else {
        console.error("Error saving item:", error);
      }
    }
  }
}
