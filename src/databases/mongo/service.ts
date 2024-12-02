// all service classes
import mongoose from 'mongoose';

import ItemModel from './models/item.js';
import { ItemDelete } from './modules/drop.js';
import { ItemFind } from './modules/find.js';
import { ItemCreate } from './modules/save.js';
import Database from './use/index.js';

import { config } from '#config/env_get';
import { MongoModuleNames } from '#ts/enums';
import { mongo_ns } from '#ts/interfaces.js';
import { DatabasesType } from '#ts/types';

class Service {
  private readonly itemModel: mongoose.Model<mongo_ns.IItem>;
  private readonly itemCreate: ItemCreate;
  private readonly itemFind: ItemFind;
  private readonly itemDelete: ItemDelete;

  public constructor() {
    this.itemModel = ItemModel.getModel();
    this.itemCreate = new ItemCreate(this.itemModel);
    this.itemFind = new ItemFind(this.itemModel);
    this.itemDelete = new ItemDelete(this.itemModel);
  }

  public async createItem(
    title: string,
    description: string
  ): Promise<mongo_ns.IItem | string> {
    return this.itemCreate.createItem(title, description);
  }

  public async getItemByTitle(id: number): Promise<mongo_ns.IItem | string> {
    return this.itemFind.getItemByTitle(id);
  }

  public async getAllItem(
    limit: number,
    page: number
  ): Promise<mongo_ns.IItem[] | string> {
    return this.itemFind.getAllItems(limit, page);
  }

  public async deleteItem(id: number): Promise<string> {
    return this.itemDelete.deleteItem(id);
  }

  public async dropCollection(): Promise<string> {
    return this.itemDelete.dropCollection();
  }
}

const itemService = new Service();

// put mongo on init
export default async function (): Promise<void> {
  const db = new Database(config.mongo_url);
  await db.connect();
}

export const mongoModules: DatabasesType = {
  name: 'mongo',
  modules: [
    {
      name: MongoModuleNames.save,
      func: itemService.createItem.bind(itemService),
    },
    {
      name: MongoModuleNames.find,
      func: itemService.getItemByTitle.bind(itemService),
    },
    {
      name: MongoModuleNames.drop,
      func: itemService.dropCollection.bind(itemService), // need bind / or we can use arrow function in Service class
    },
    {
      name: MongoModuleNames.delete,
      func: itemService.deleteItem.bind(itemService),
    },
    {
      name: MongoModuleNames.getall,
      func: itemService.getAllItem.bind(itemService),
    },
    // ماژول های تکراری کار میکند!
    // قابلیتی برای اجرای همزمان دو دیتابیس و ماژول های تکراری
    {
      name: MongoModuleNames.getall,
      func: itemService.getAllItem.bind(itemService),
    },
  ],
};
