import { MongoModuleNames, MysqlModuleNames } from "./enums.js";

export type DatabasesUseType = "mongo" | "mysql";

export type NamedModules = {
  name: string | MongoModuleNames | MysqlModuleNames;
  func: (...args: any[]) => Promise<any> | any | Promise<void> | void;
  called?: boolean;
};

export type DatabasesType = {
  name: DatabasesUseType;
  modules: NamedModules[];
  called?: boolean; // check one time caller for next version on Redis cache
};
