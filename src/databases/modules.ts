import { DatabasesType } from "#ts/types";
import { mongoModules } from "./mongo/service.js";
import { mysqlModules } from "./mysql/modules/index.js";

import { mongoModules_v5 } from "./v5/mongo/service.js";
import { mysqlModules_v5 } from "./v5/mysql/modules/index.js";

export const databasesArray: DatabasesType[] = [
  // modules on same databases
  mongoModules,
  mysqlModules,

  // v5
  mongoModules_v5,
  mysqlModules_v5
];
