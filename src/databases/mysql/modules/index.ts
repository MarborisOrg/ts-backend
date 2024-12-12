import { deleteBookById, dropBooks } from './drop.js'
import { findAllBooks, findBookById } from './find.js'
import { saveBook } from './save.js'

import { MysqlModuleNames } from './databases/database.enum'
import { DatabasesType } from './databases/database.type'

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
}
