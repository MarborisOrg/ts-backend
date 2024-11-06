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
      } catch (error: any) { // استفاده از any برای نوع خطا
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
}

const main = async () => {
    const db = new Database(config.mongo_url);
    await db.connect();

    const itemService = new ItemService();
    await itemService.createItem('عنوان', 'توضیحات');
    await itemService.getAllItems();
};

main();
