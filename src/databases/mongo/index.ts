import mongoose from 'mongoose';
import ItemModel, { IItem } from './models/item.js';
import { config } from '../../config/env_get.js';

class Database {
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }
}

class ItemService {
  private itemModel;

  constructor() {
    this.itemModel = ItemModel.getModel();
  }

  public async createItem(title: string, descrp: string) {
    const newItem: IItem = new this.itemModel({ title, descrp });
    try {
      const savedItem = await newItem.save();
      console.log('Item saved:', savedItem);
    } catch (error: any) {
      if (error.code === 11000) {
        console.error(`Error: An item with the title "${title}" already exists.`);
      } else {
        console.error('Error saving item:', error);
      }
    }
  }

  public async getAllItems() {
    try {
      const items = await this.itemModel.find();
      console.log('All items:', items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  public async deleteItem(title: string) {
    try {
      const result = await this.itemModel.deleteOne({ title });
      if (result.deletedCount === 0) {
        console.log(`No item found with the title "${title}".`);
      } else {
        console.log(`Item with the title "${title}" has been deleted.`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  public async dropCollection() {
    try {
      await this.itemModel.collection.drop();
      console.log('Collection dropped successfully.');
    } catch (error) {
      console.error('Error dropping collection:', error);
    }
  }
}

const main = async () => {
  const db = new Database(config.mongo_url);
  await db.connect();

  const itemService = new ItemService();
  await itemService.createItem('عنوان', 'توضیحات');
  await itemService.getAllItems();

  // حذف یک آیتم
  // await itemService.deleteItem('عنوان');

  // حذف کل مجموعه
  // await itemService.dropCollection();
};

main();
