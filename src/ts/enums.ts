/**
 * We have to make all the database modules that are separate similar
 * And make the capabilities of each similar module in the databases similar to each other
 */

// Note: this name are unique
// don't repeat a name
// or empty names
export enum MongoModuleNames {
  drop = 'drop',
  find = 'find',
  save = 'save',
  delete = 'delete',
}

export enum MysqlModuleNames {
  drop = 'drop', // drop all table (book) +get table name! no set default TODO()
  find = 'find',
  save = 'save',
}

// v5
export enum MongoModuleNames_v5 {
  drop = 'drop_v5',
  find = 'find_v5',
  save = 'save_v5',
  delete = 'delete_v5',
}

export enum MysqlModuleNames_v5 {
  drop = 'drop_v5', // drop all table (book) +get table name! no set default TODO()
  find = 'find_v5',
  save = 'save_v5',
}
