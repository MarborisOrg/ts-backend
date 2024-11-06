import mongoose from 'mongoose';
import Item, { IItem } from './models/item.js';

const connectDB = async () => {
  try {
      await mongoose.connect('mongodb://localhost:27017/yourDatabaseName');
      console.log('MongoDB connected');
  } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
  }
};

const createItem = async (title: string, descrp: string) => {
    const newItem: IItem = new Item({ title, descrp });
    try {
        const savedItem = await newItem.save();
        console.log('Item saved:', savedItem);
    } catch (error) {
        console.error('Error saving item:', error);
    }
};

const getAllItems = async () => {
    try {
        const items = await Item.find();
        console.log('All items:', items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

const main = async () => {
    await connectDB();
    await createItem('عنوان', 'توضیحات');
    await getAllItems();
};

main();
