import { DatabaseModuleNames } from "#ts/enums.js";
import { DatabasesType } from "#ts/types";
import cuse from "./c-use.js"
import assert from "assert";

const mainArray: DatabasesType[] = [
  {
    name: "mongo",
    functions: [
      { name: DatabaseModuleNames.Function1, func: () => console.log("Function 1 from Row 1") },
      { name: DatabaseModuleNames.Function2, func: () => console.log("Function 2 from Row 1") },
    ],
    called: false,
  },
  {
    name: "mysql",
    functions: [
      { name: DatabaseModuleNames.Function1, func: () => console.log("Function 1 from Row 2") },
      { name: DatabaseModuleNames.Function2, func: () => console.log("Function 2 from Row 2") },
    ],
    called: false,
  },
];

function call(functionName: string | DatabaseModuleNames) {
  const dbUse = cuse();
  const row = mainArray.find((r) => r.name === dbUse);

  if (!row) assert(false, "[M40]: Row not found");

  if (true) { // check cache (!row.called)
    const namedFunction = row.functions.find((f) => f.name === functionName);

    if (namedFunction) {
      console.log(`Calling ${namedFunction.name} from ${row.name}:`);
      namedFunction.func();
    } else {
      console.log(`Function ${functionName} not found in ${row.name}.`);
    }

    row.called = true; // put on cache
  } else {
    // console.log(`${row.name} has already been called.`);
    // already in cache
  }
}

call("Function 1");
call("Function 2");
call("Function 1");
call("Function 1");
