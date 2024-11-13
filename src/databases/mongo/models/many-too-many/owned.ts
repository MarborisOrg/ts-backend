import mongoose, { Document, Schema } from "mongoose";
import { config } from "#config/env_get";
import { mongo_ns } from "#ts/interfaces";

class OwnershipModel {
  private ownershipSchema: Schema;

  constructor() {
    this.ownershipSchema = new Schema({
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
      createdAt: { type: Date, default: Date.now }
    });
  }

  public getModel() {
    return mongoose.model<mongo_ns.IOwnership>("Ownership", this.ownershipSchema);
  }
}

export default new OwnershipModel();
