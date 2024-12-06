import mongoose, { Schema } from 'mongoose';

import { mongo_ns } from '#ts.interfaces';

class OwnershipModel {
  private readonly ownershipSchema: Schema;

  public constructor() {
    this.ownershipSchema = new Schema({
      user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
      item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
      createdAt: { type: Date, default: Date.now },
    });
  }

  public getModel(): mongoose.Model<mongo_ns.IOwnership> {
    return mongoose.model<mongo_ns.IOwnership>(
      'Ownership',
      this.ownershipSchema
    );
  }
}

export default new OwnershipModel();
