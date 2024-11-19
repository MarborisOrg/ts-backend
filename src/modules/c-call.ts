import cuse from './c-use.js';

import { databasesArray } from '#databases/modules';
import { MongoModuleNames, MysqlModuleNames } from '#ts/enums';

const dbUse = cuse();

// TODO() Check this ????
// both options for call all databases
export async function call(
  functionName: string | MongoModuleNames | MysqlModuleNames,
  ...args: readonly any[]
): Promise<any> {
  const rows = databasesArray.filter((r) => r.name === dbUse);

  if (rows.length === 0) {
    assert('[M40]: Row not found');
  }

  // eslint-disable-next-line no-constant-condition
  if (true) {
    try {
      // check cache (!row.called)
      const namedFunctions = rows.flatMap((row) =>
        row.modules
          .filter((f) => f.name === functionName)
          .map((f) => ({ ...f, rowName: row.name })),
      );

      if (namedFunctions.length > 0) {
        try {
          const results = namedFunctions.map(async (namedFunction) => {
            log.info(`Calling ${namedFunction.name} from ${namedFunction.rowName}:`);
            return await namedFunction.func(...args);
          });
          return await Promise.all(results);
        } catch (error) {
          log.info(`error in call! -> ` + error);
          return null;
        }
      } else {
        assert(`Function ${functionName} not found in ${dbUse}.`);
      }
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
