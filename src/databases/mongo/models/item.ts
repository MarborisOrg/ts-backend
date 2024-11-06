import mongoose, { Document, Schema } from "mongoose";
import { config } from "../../../config/env_get.js";

export interface IItem extends Document {
  title: string;
  descrp: string;
}

class ItemModel {
  private itemSchema: Schema;

  constructor() {
    this.itemSchema = new Schema({
      title: { type: String, required: true, unique: true },
      descrp: { type: String, required: true },
    });
  }

  public getModel() {
    return mongoose.model<IItem>(config.tc_book_name, this.itemSchema);
  }
}

export default new ItemModel();
