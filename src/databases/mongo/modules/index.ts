import { DatabaseModuleNames } from "#ts/enums";
import { DatabasesType } from "#ts/types";
import { sleep } from "#utils/sleep";

export const mongoModules: DatabasesType = {
  name: "mongo",
  modules: [
    {
      name: DatabaseModuleNames.Function1,
      func: (param1: string, param2: number) =>
        console.log(
          `Function 1 from Row 1 with param1: ${param1} and param2: ${param2}`
        ),
    },
    {
      name: DatabaseModuleNames.Function2,
      func: (param: string) =>
        console.log(`Function 2 from Row 1 with param: ${param}`),
    },
    {
      name: DatabaseModuleNames.Function3,
      func: async () => {
        await sleep(2000);
        return "Hi";
      },
    },
  ],
  called: false,
};
