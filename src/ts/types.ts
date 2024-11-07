import { DatabaseModuleNames } from "./enums.js";

export type DatabasesUseType = "mongo" | "mysql";

export type NamedModules = {
  name: DatabaseModuleNames;
  func: () => void;
};

export type DatabasesType = {
  name: DatabasesUseType;
  functions: NamedModules[];
  called: boolean; // check one time caller for next version on Redis cache
};
