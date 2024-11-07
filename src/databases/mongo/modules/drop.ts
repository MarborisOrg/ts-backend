import mongoose from "mongoose";
import { mongo_ns } from "#ts/interfaces";

export class ItemDelete {
  private itemModel;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async deleteItem(title: string) {
    try {
      const result = await this.itemModel.deleteOne({ title });
      if (result.deletedCount === 0) {
        console.log(`No item found with the title "${title}".`);
      } else {
        console.log(`Item with the title "${title}" has been deleted.`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  public async dropCollection() {
    try {
      await this.itemModel.collection.drop();
      console.log("Collection dropped successfully.");
    } catch (error) {
      console.error("Error dropping collection:", error);
    }
  }
}
