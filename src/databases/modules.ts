// import { mongoModules_v5 } from './apps/v5/mongo/service.js';
// import { mysqlModules_v5 } from './apps/v5/mysql/modules/index.js';
import { mongoModules } from './mongo/service.js';
import { mysqlModules } from './mysql/modules/index.js';

import { DatabasesType } from '#database.type';

export const databasesArray: readonly DatabasesType[] = [
  // modules on same databases
  mongoModules,
  mysqlModules,

  // v5
  // mongoModules_v5,
  // mysqlModules_v5,
];
