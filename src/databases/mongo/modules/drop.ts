import mongoose from 'mongoose';

import { mongo_ns } from '#ts/interfaces';

export class ItemDelete {
  private readonly itemModel;

  public constructor(itemModel: mongoose.Model<mongo_ns.IItem>) {
    this.itemModel = itemModel;
  }

  public async deleteItem(id: number): Promise<any> {
    if (!this.itemModel) {
      assert('Item model is not set.', true);
    }

    try {
      const result = await this.itemModel.deleteOne({ id });
      if (result.deletedCount === 0) {
        assert(`No item found with the id "${id}".`, true);
      }
      return `Item with the id "${id}" has been deleted.`;
    } catch (error) {
      assert(
        `Error deleting item: ${error instanceof Error ? error.message : error}`,
        true
      );
    }
  }

  public async dropCollection(): Promise<any> {
    if (!this.itemModel) {
      assert('Item model is not set.', true);
    }

    try {
      await this.itemModel.collection.drop();
      return 'Collection dropped successfully.';
    } catch (error) {
      assert(
        `Error dropping collection: ${error instanceof Error ? error.message : error}`,
        true
      );
    }
  }
}
