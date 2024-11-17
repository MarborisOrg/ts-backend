import mongoose, { Schema } from "mongoose";
import { mongo_ns } from "#ts/interfaces";

const ownershipSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: false },
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  createdAt: { type: Date, default: Date.now },
});

const OwnershipModel = mongoose.models.Ownership || mongoose.model<mongo_ns.IOwnership>("Ownership", ownershipSchema);

export default OwnershipModel;
