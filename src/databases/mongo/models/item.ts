import mongoose, { Schema } from "mongoose";
import { mongo_ns } from "#ts/interfaces";

class ItemModel {
  private itemSchema: Schema;

  constructor() {
    this.itemSchema = new Schema({
      title: { type: String, required: true, unique: true },
      descrp: { type: String, required: true },
      owners: [{ type: Schema.Types.ObjectId, ref: "Ownership" }],
    });
  }

  public getModel() {
    return mongoose.model<mongo_ns.IItem>("Item", this.itemSchema);
  }
}

export default new ItemModel();
