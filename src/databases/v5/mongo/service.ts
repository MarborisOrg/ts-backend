// all service classes
import mongoose from 'mongoose';

import ItemModel from './models/item.js';
import { ItemDelete } from './modules/drop.js';
import { ItemFind } from './modules/find.js';
import { ItemCreate } from './modules/save.js';

// module
import { MongoModuleNames_v5 } from '#ts/enums';
import { mongo_ns } from '#ts/interfaces.js';
import { DatabasesType } from '#ts/types';

class Service {
  private readonly itemModel: mongoose.Model<mongo_ns.IItem>;
  private readonly itemCreate: ItemCreate;
  private readonly itemFind: ItemFind;
  private readonly itemDelete: ItemDelete;

  constructor() {
    this.itemModel = ItemModel;
    this.itemCreate = new ItemCreate(this.itemModel);
    this.itemFind = new ItemFind(this.itemModel);
    this.itemDelete = new ItemDelete(this.itemModel);
  }

  public async createItem(
    title: string,
    descrp: string,
  ): Promise<mongo_ns.IItem | string> {
    return await this.itemCreate.createItem(title, descrp);
  }

  public async getItemByTitle(title: string): Promise<mongo_ns.IItem | string> {
    return await this.itemFind.getItemByTitle(title);
  }

  public async deleteItem(title: string): Promise<string> {
    return await this.itemDelete.deleteItem(title);
  }

  public async dropCollection(): Promise<string> {
    return await this.itemDelete.dropCollection();
  }
}

const itemService = new Service();

export const mongoModules_v5: DatabasesType = {
  name: 'mongo',
  modules: [
    {
      name: MongoModuleNames_v5.save,
      func: itemService.createItem.bind(itemService),
    },
    {
      name: MongoModuleNames_v5.find,
      func: itemService.getItemByTitle.bind(itemService),
    },
    {
      name: MongoModuleNames_v5.drop,
      func: itemService.dropCollection.bind(itemService), // need bind / or we can use arrow function in Service class
    },
    {
      name: MongoModuleNames_v5.delete,
      func: itemService.deleteItem.bind(itemService),
    },
  ],
};
