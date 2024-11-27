import { databasesArray } from '#databases/modules';
import { MongoModuleNames, MysqlModuleNames } from '#ts/enums';

const dbUse = $.cuse();

export async function call(
  functionName: string | MongoModuleNames | MysqlModuleNames,
  ...args: readonly any[]
): Promise<any> {
  const rows = databasesArray.filter((r) => r.name === dbUse);

  if (rows.length === 0) {
    assert('[M40]: Row not found');
  }

  try {
    // check cache (!row.called)
    const namedFunctions = rows.flatMap((row) =>
      row.modules
        .filter((f) => f.name === functionName)
        .map((f) => ({ ...f, rowName: row.name }))
    );

    if (namedFunctions.length > 0) {
      const results = namedFunctions.map((namedFunction): Promise<any> => {
        log.info(
          `Calling ${namedFunction.name} from ${namedFunction.rowName}:`
        );
        return namedFunction.func(...args);
      });
      const res = await Promise.all(results);
      console.log('res: ' + res);
      return res;
    } else {
      assert(`Function ${functionName} not found in ${dbUse}.`);
    }
  } finally {
    // row.called = true; // put on cache
    // or we can add defer, or lock (like guard lock (C++))
  }
}
