import { MongoModuleNames, MysqlModuleNames } from './enums.js';

export type DatabasesUseType = 'mongo' | 'mysql';

export type NamedModuleData = {
  readonly name: string | MongoModuleNames | MysqlModuleNames;
  readonly called?: boolean;
};

export type NamedModuleFunc = {
  readonly func: (...args: readonly any[]) => Promise<any> | any | Promise<void> | void;
};

export type NamedModules = NamedModuleData & NamedModuleFunc;

export type DatabasesType = {
  readonly name: DatabasesUseType;
  readonly modules: readonly NamedModules[];
  readonly called?: boolean; // check one time caller for next version on Redis cache
};
