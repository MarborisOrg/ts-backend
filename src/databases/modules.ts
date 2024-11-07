import { DatabasesType } from "#ts/types";
import { mongoModules } from "./mongo/modules";
import { mysqlModules } from "./mysql/modules";

export const databasesArray: DatabasesType[] = [
    // modules on same databases
    mongoModules,
    mysqlModules,
  ];