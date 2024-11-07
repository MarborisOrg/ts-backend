import { DatabasesUseType } from "#ts/types";

type NamedFunction = {
  name: string;
  func: () => void;
};

type Row = {
  name: DatabasesUseType;
  functions: NamedFunction[];
  called: boolean; // check one time caller for next version on Redis cache
};

const mainArray: Row[] = [
  {
    name: "mongo",
    functions: [
      { name: "Function 1", func: () => console.log("Function 1 from Row 1") },
      { name: "Function 2", func: () => console.log("Function 2 from Row 1") },
    ],
    called: false,
  },
  {
    name: "mysql",
    functions: [
      { name: "Function 1", func: () => console.log("Function 1 from Row 2") },
      { name: "Function 2", func: () => console.log("Function 2 from Row 2") },
    ],
    called: false,
  },
];

function callFunctionByName(rowName: string, functionName: string) {
  const row = mainArray.find((r) => r.name === rowName);

  if (!row) {
    console.log("Row not found");
    return;
  }

  if (!row.called) {
    const namedFunction = row.functions.find((f) => f.name === functionName);

    if (namedFunction) {
      console.log(`Calling ${namedFunction.name} from ${row.name}:`);
      namedFunction.func();
    } else {
      console.log(`Function ${functionName} not found in ${row.name}.`);
    }

    row.called = true;
  } else {
    console.log(`${row.name} has already been called.`);
  }
}

callFunctionByName("Row 1", "Function 1");
callFunctionByName("Row 1", "Function 2");
callFunctionByName("Row 2", "Function 1");
callFunctionByName("Row 1", "Function 1");
