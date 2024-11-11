/**
 * We have to make all the database modules that are separate similar
 * And make the capabilities of each similar module in the databases similar to each other
 */

// Note: this name are unique
// dont repeat a name
// or empty names
export enum MongoModuleNames {
  drop = "drop",
  find = "find",
  save = "save",
  delete = "delete",
}

export enum MysqlModuleNames {
  drop = "drop", // drop all table (book) +get table name! no set default TODO()
  find = "find",
  save = "save",
}
