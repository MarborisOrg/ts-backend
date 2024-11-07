import { DatabaseModuleNames } from "#ts/enums";
import { DatabasesType } from "#ts/types";
import cuse from "./c-use.js";
import assert from "assert";

const mongoModules: DatabasesType = {
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

const mysqlModules: DatabasesType = {
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
// make this array in default file, make modules in database folders
// both options for call all databases
const databasesArray: DatabasesType[] = [
  // modules on same databases
  mongoModules,
  mysqlModules,
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function call(
  functionName: string | DatabaseModuleNames,
  ...args: any[]
): Promise<any> {
  const dbUse = cuse();
  const row = databasesArray.find((r) => r.name === dbUse);

  if (!row) assert(false, "[M40]: Row not found");

  if (true) {
    // check cache (!row.called)
    try {
      const namedFunction = row.modules.find((f) => f.name === functionName);

      if (namedFunction) {
        console.log(`Calling ${namedFunction.name} from ${row.name}:`);
        return await namedFunction.func(...args);
      } else {
        console.log(`Function ${functionName} not found in ${row.name}.`);
        return null;
      }
    } catch (error) {
      console.log(`error in call! -> ` + error);
      return null;
    } finally {
      row.called = true; // put on cache
    }
  } else {
    // console.log(`${row.name} has already been called.`);
    // already in cache
    // work with times for spam!
  }
}

async function main() {
  const result1 = await call("f3");
  console.log(result1); // "Hi"
}

main();

call("Function 1", "test", 42);
call("Function 2", "another test");
call("Function 1", "test again", 100);
call("Function 1", "yet another test", 200);

main();