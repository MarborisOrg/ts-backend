import { mongo_ns } from "#ts/interfaces";
import mongoose from "mongoose";

export class ItemFind {
  private itemModel;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async getAllItems() {
    try {
      const items = await this.itemModel.find();
      console.log("All items:", items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }
}
