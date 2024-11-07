import { MysqlModuleNames } from "#ts/enums";
import { DatabasesType } from "#ts/types";
import { dropBooks } from "./drop";
import { findBookByTitle } from "./find";
import { saveBook } from "./save";

export const mysqlModules: DatabasesType = {
  name: "mysql",
  modules: [
    {
      name: MysqlModuleNames.drop,
      func: dropBooks,
    },
    {
      name: MysqlModuleNames.find,
      func: findBookByTitle,
    },
    {
      name: MysqlModuleNames.save,
      func: saveBook,
    }
  ]
};
