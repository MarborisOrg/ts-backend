/**
 * @link https://github.com/S-MRB-S
 * @author MRB
 * @license UNLICENSED
 * @description This module defines TypeScript types for database usage and named modules.
 * It includes types for specifying database types, module data, and module functions.
 */

import { MongoModuleNames, MysqlModuleNames } from './enums.js';

/**
 * Type definition for the databases that can be used in the application.
 */
export type DatabasesUseType = 'mongo' | 'mysql';

/**
 * Type definition for named module data.
 * This includes the name of the module and an optional called flag.
 */
export type NamedModuleData = {
  readonly name: string | MongoModuleNames | MysqlModuleNames; // Name of the module
  readonly called?: boolean; // Optional flag indicating if the module has been called
};

/**
 * Type definition for a named module function.
 * This includes the function itself, which can return a promise or a value.
 */
export type NamedModuleFunc = {
  readonly func: (
    ...args: readonly any[] // Arguments for the function
  ) => Promise<any> | any | Promise<void> | void; // Function return type
};

/**
 * Combined type definition for named modules, including both data and function types.
 */
export type NamedModules = NamedModuleData & NamedModuleFunc;

/**
 * Type definition for databases, including the type of database and its associated modules.
 */
export type DatabasesType = {
  readonly name: DatabasesUseType; // Type of database (mongo or mysql)
  readonly modules: readonly NamedModules[]; // Array of named modules associated with the database
  readonly called?: boolean; // Optional flag to check if the database has been called (for caching purposes)
};
