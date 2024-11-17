import mongoose, { Schema } from "mongoose";
import { mongo_ns } from "#ts/interfaces";

const itemSchema = new Schema({
  title: { type: String, required: true, unique: true },
  descrp: { type: String, required: true },
  owners: [{ type: Schema.Types.ObjectId, ref: "Ownership" }],
});

const ItemModel = mongoose.models.Item || mongoose.model<mongo_ns.IItem>("Item", itemSchema);

export default ItemModel;
