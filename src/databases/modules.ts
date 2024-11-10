import { DatabasesType } from "#ts/types";
import { mongoModules } from "./mongo/service.js";
import { mysqlModules } from "./mysql/modules/index.js";

export const databasesArray: DatabasesType[] = [
  // modules on same databases
  mongoModules,
  mysqlModules,
];