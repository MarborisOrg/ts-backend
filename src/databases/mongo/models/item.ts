import mongoose, { Schema } from 'mongoose';

import { mongo_ns } from '#ts/interfaces';

class ItemModel {
  private readonly itemSchema: Schema;

  public constructor() {
    this.itemSchema = new Schema({
      title: { type: String, required: true },
      description: { type: String, required: true },
      owners: [{ type: Schema.Types.ObjectId, ref: 'Ownership' }],
    });
  }

  public getModel(): mongoose.Model<mongo_ns.IItem> {
    return mongoose.model<mongo_ns.IItem>('Item', this.itemSchema);
  }
}

export default new ItemModel();
