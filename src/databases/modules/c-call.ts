import { databasesArray } from '#databases/modules';
import { MongoModuleNames, MysqlModuleNames } from '#ts/enums';

const dbUse = $.cuse();

export async function call(
  functionName: string | MongoModuleNames | MysqlModuleNames,
  ...args: readonly any[]
): Promise<any> {
  const noRepeat = args[args.length - 1] === false;
  if (noRepeat) {
    args = args.slice(0, -1);
  }

  const rows = databasesArray.filter((r) => r.name === dbUse);

  if (rows.length === 0) {
    assert('[M40]: Row not found');
  }

  try {
    const namedFunctions = rows.flatMap((row) =>
      row.modules
        .filter((f) => f.name === functionName)
        .map((f) => ({ ...f, rowName: row.name }))
    );

    if (namedFunctions.length > 0) {
      if (noRepeat) {
        const firstFunction = namedFunctions[0];
        log.info(
          `Calling ${firstFunction.name} from ${firstFunction.rowName}:`
        );
        const result = await firstFunction.func(...args);
        return result;
      } else {
        const results = namedFunctions.map((namedFunction): Promise<any> => {
          log.info(
            `Calling ${namedFunction.name} from ${namedFunction.rowName}:`
          );
          return namedFunction.func(...args);
        });
        const res = await Promise.all(results);
        return res;
      }
    } else {
      assert(`Function ${functionName} not found in ${dbUse}.`);
    }
  } finally {
    // row.called = true; // put on cache
    // or we can add defer, or lock (like guard lock (C++))
  }
}
