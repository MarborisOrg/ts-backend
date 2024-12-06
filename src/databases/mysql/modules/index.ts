import { deleteBookById, dropBooks } from './drop.js';
import { findAllBooks, findBookById } from './find.js';
import { saveBook } from './save.js';

import { MysqlModuleNames } from '#database.enum.module';
import { DatabasesType } from '#database.types';

export const mysqlModules: DatabasesType = {
  name: 'mysql',
  modules: [
    {
      name: MysqlModuleNames.drop,
      func: dropBooks,
    },
    {
      name: MysqlModuleNames.find,
      func: findBookById,
    },
    {
      name: MysqlModuleNames.save,
      func: saveBook,
    },
    {
      name: MysqlModuleNames.delete,
      func: deleteBookById,
    },
    {
      name: MysqlModuleNames.getall,
      func: findAllBooks,
    },
  ],
};
