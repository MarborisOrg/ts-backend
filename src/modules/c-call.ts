import { databasesArray } from "#databases/modules";
import { MongoModuleNames, MysqlModuleNames } from "#ts/enums";
import cuse from "./c-use.js";
import assert from "assert";

const dbUse = cuse();

// both options for call all databases
export async function call(
  functionName: string | MongoModuleNames | MysqlModuleNames,
  ...args: any[]
): Promise<any> {
  const row = databasesArray.find((r) => r.name === dbUse);

  if (!row) assert(false, "[M40]: Row not found");

  if (true) {
    // check cache (!row.called)
    try {
      const namedFunction = row.modules.find((f) => f.name === functionName);

      if (namedFunction) {
        log.info(`Calling ${namedFunction.name} from ${row.name}:`);
        return await namedFunction.func(...args);
      } else {
        log.info(`Function ${functionName} not found in ${row.name}.`);
        return null;
      }
    } catch (error) {
      log.info(`error in call! -> ` + error);
      return null;
    } finally {
      // row.called = true; // put on cache
      // or we can add defer, or lock (like guard lock (C++))
    }
  } else {
    // log.info(`${row.name} has already been called.`);
    // already in cache
    // work with times for spam!
  }
}

// async function main() {
//   const result1 = await call("f3");
//   log.info(result1); // "Hi"
// }

// main();

// call("Function 1", "test", 42);
// call("Function 2", "another test");
// call("Function 1", "test again", 100);
// call("Function 1", "yet another test", 200);
