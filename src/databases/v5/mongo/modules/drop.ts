import mongoose from 'mongoose';

import { mongo_ns } from '#ts/interfaces';

export class ItemDelete {
  private readonly itemModel;

  constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async deleteItem(title: string): Promise<string> {
    if (!this.itemModel) {
      throw new Error('Item model is not set.');
    }

    try {
      const result = await this.itemModel.deleteOne({ title });
      if (result.deletedCount === 0) {
        throw new Error(`No item found with the title "${title}".`);
      }
      return `Item with the title "${title}" has been deleted.`;
    } catch (error) {
      throw new Error(
        `Error deleting item: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  public async dropCollection(): Promise<string> {
    if (!this.itemModel) {
      throw new Error('Item model is not set.');
    }

    try {
      await this.itemModel.collection.drop();
      return 'Collection dropped successfully.';
    } catch (error) {
      throw new Error(
        `Error dropping collection: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}
