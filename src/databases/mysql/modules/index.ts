import { DatabaseModuleNames } from "#ts/enums";
import { DatabasesType } from "#ts/types";

export const mysqlModules: DatabasesType = {
    name: "mysql",
    modules: [
      {
        name: DatabaseModuleNames.Function1,
        func: (param1: string, param2: number) =>
          console.log(
            `Function 1 from Row 2 with param1: ${param1} and param2: ${param2}`
          ),
      },
      {
        name: DatabaseModuleNames.Function2,
        func: (param: string) =>
          console.log(`Function 2 from Row 2 with param: ${param}`),
      },
    ],
    called: false,
  };