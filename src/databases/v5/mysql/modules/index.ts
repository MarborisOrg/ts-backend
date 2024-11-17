import { MysqlModuleNames, MysqlModuleNames_v5 } from "#ts/enums";
import { DatabasesType } from "#ts/types";
import { dropBooks } from "./drop.js";
import { findBookByTitle } from "./find.js";
import { saveBook } from "./save.js";

export const mysqlModules_v5: DatabasesType = {
  name: "mysql",
  modules: [
    {
      name: MysqlModuleNames_v5.drop,
      func: dropBooks,
    },
    {
      name: MysqlModuleNames_v5.find,
      func: findBookByTitle,
    },
    {
      name: MysqlModuleNames_v5.save,
      func: saveBook,
    },
  ],
};
