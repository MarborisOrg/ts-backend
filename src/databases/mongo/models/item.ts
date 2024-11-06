import mongoose, { Document, Schema } from "mongoose";
import { config } from "#config/env_get";
import { mongo_ns } from "#ts/interfaces";

class ItemModel {
  private itemSchema: Schema;

  constructor() {
    this.itemSchema = new Schema({
      title: { type: String, required: true, unique: true },
      descrp: { type: String, required: true },
    });
  }

  public getModel() {
    return mongoose.model<mongo_ns.IItem>(config.tc_book_name, this.itemSchema);
  }
}

export default new ItemModel();
