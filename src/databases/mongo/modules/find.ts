import { mongo_ns } from "#ts/interfaces.js";
import mongoose from "mongoose";

export class ItemFind {
  private itemModel: mongoose.Model<mongo_ns.IItem>;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async getItemByTitle(title: string) {
    try {
      const item = await this.itemModel.findOne({ title });
      if (item) {
        console.log("Item found:", item);
      } else {
        console.log(`No item found with the title "${title}".`);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  }
}
