import { DatabaseModuleNames } from "./enums.js";

export type DatabasesUseType = "mongo" | "mysql";

export type NamedModules = {
  name: DatabaseModuleNames;
  func: () => void;
};

export type DatabasesType = {
  name: DatabasesUseType;
  modules: NamedModules[];
  called: boolean; // check one time caller for next version on Redis cache
};
