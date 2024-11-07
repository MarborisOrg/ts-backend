/**
 * We have to make all the database modules that are separate similar
 * And make the capabilities of each similar module in the databases similar to each other
 */

// Note: this name are unique
// dont repeat a name
// or empty names
export enum MongoModuleNames {
  Function1 = "Function 1",
  Function2 = "Function 2",
  Function3 = "f3",
}

export enum MysqlModuleNames {
  drop = "drop",
  find = "find",
  save = "save"
}
