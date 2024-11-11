// all service classes
import ItemModel from "./models/item.js";
import { config } from "#config/env_get";
import Database from "./use/index.js";
import { mongo_ns } from "#ts/interfaces.js";
import mongoose from "mongoose";
import { ItemCreate } from "./modules/save.js";
import { ItemFind } from "./modules/find.js";
import { ItemDelete } from "./modules/drop.js";

// module
import { MongoModuleNames } from "#ts/enums";
import { DatabasesType } from "#ts/types";

class Service {
  private itemModel: mongoose.Model<mongo_ns.IItem>;
  private itemCreate: ItemCreate;
  private itemFind: ItemFind;
  private itemDelete: ItemDelete;

  constructor() {
    this.itemModel = ItemModel.getModel();
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

// put mongo on init
export default async function () {
  const db = new Database(config.mongo_url);
  await db.connect();

  // await itemService.createItem("عنوان", "توضیحات"); // test -> OK
}

export const mongoModules: DatabasesType = {
  name: "mongo",
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
  ],
};
