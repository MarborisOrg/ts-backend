/* eslint-disable import/order */
import { mongo_ns } from '#ts/interfaces';
import mongoose, { Document, Schema } from 'mongoose';

interface ICounter extends Document {
  sequenceValue: number;
}

const counterSchema = new Schema<ICounter>({
  sequenceValue: { type: Number, default: 0 },
});

export const UserCounter = mongoose.model<ICounter>('Counter', counterSchema);

class ItemModel {
  private itemSchema: Schema;

  public constructor() {
    this.itemSchema = new Schema<mongo_ns.IItem>({
      title: { type: String, required: true },
      description: { type: String, required: true },
      owners: [{ type: Schema.Types.ObjectId, ref: 'Ownership' }],
      id: { type: Number, unique: true },
    });

    this.itemSchema.pre<mongo_ns.IItem>('save', async function (next) {
      if (!this.isNew) {
        return next();
      }

      try {
        const counter = await UserCounter.findOneAndUpdate(
          {},
          { $inc: { sequenceValue: 1 } },
          { new: true, upsert: true }
        );

        this.id = counter?.sequenceValue || 1;
        next();
      } catch (error: any) {
        next(error);
      }
    });
  }

  public getModel(): mongoose.Model<mongo_ns.IItem> {
    return mongoose.model<mongo_ns.IItem>('Item', this.itemSchema);
  }
}

export default new ItemModel();
