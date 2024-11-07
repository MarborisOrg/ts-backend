import { DatabaseModuleNames } from "#ts/enums";
import { DatabasesType } from "#ts/types";
import cuse from "./c-use.js";
import assert from "assert";

type Function1Args = [string, number]; // نوع آرگومان‌های Function1
type Function2Args = [string]; // نوع آرگومان‌های Function2

const databasesArray: DatabasesType[] = [
    {
        name: "mongo",
        modules: [
            { 
                name: DatabaseModuleNames.Function1, 
                func: async (param1: string, param2: number) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            console.log(`Function 1 from Row 1 with param1: ${param1} and param2: ${param2}`);
                            resolve("Result from Function 1"); // برگرداندن یک نتیجه
                        }, 1000);
                    });
                }
            },
            { 
                name: DatabaseModuleNames.Function2, 
                func: (param: string) => {
                    console.log(`Function 2 from Row 1 with param: ${param}`);
                    // هیچ چیزی برنگردانید
                } 
            },
        ],
        called: false,
    },
    {
        name: "mysql",
        modules: [
            { 
                name: DatabaseModuleNames.Function1, 
                func: async (param1: string, param2: number) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            console.log(`Function 1 from Row 2 with param1: ${param1} and param2: ${param2}`);
                            resolve("Result from Function 1"); // برگرداندن یک نتیجه
                        }, 1000);
                    });
                }
            },
            { 
                name: DatabaseModuleNames.Function2, 
                func: (param: string) => {
                    console.log(`Function 2 from Row 2 with param: ${param}`);
                    return "Result from Function 2"; // برگرداندن یک نتیجه
                } 
            },
        ],
        called: false,
    },
];

// تابع call با استفاده از async/await
async function call<T extends DatabaseModuleNames>(functionName: T, ...args: T extends DatabaseModuleNames.Function1 ? Function1Args : Function2Args) {
    const dbUse = cuse();
    const row = databasesArray.find((r) => r.name === dbUse);

    if (!row) assert(false, "[M40]: Row not found");

    if (true) { // check cache (!row.called)
        const namedFunction = row.modules.find((f) => f.name === functionName);

        if (namedFunction) {
            console.log(`Calling ${namedFunction.name} from ${row.name}:`);
            const result = await namedFunction.func(...args); // ارسال پارامترها به تابع و انتظار برای Promise
            console.log(`Result: ${result}`); // نمایش نتیجه
        } else {
            console.log(`Function ${functionName} not found in ${row.name}.`);
        }

        row.called = true; // put on cache
    } else {
        // console.log(`${row.name} has already been called.`);
        // already in cache
        // work with times for spam!
    }
}

// call("Function 1", "test", 42);
// call("Function 2", "another test");
// call("Function 1", "test again", 100);
// call("Function 1", "yet another test", 200);

(async () => {
    const result1 = await call(DatabaseModuleNames.Function1, "test", 42); // صدا زدن "Function 1" با دو پارامتر
    console.log(`Function 1 returned: ${result1}`); // نمایش نتیجه برگردانده شده از Function 1

    const result2 = call(DatabaseModuleNames.Function2, "another test"); // صدا زدن "Function 2" با یک پارامتر
    console.log(`Function 2 returned: ${result2}`); // نمایش نتیجه برگردانده شده از Function 2

    // می‌توانید توابع را دوباره صدا بزنید
    const result3 = await call(DatabaseModuleNames.Function1, "test again", 100); // صدا زدن دوباره "Function 1" با دو پارامتر
    console.log(`Function 1 returned: ${result3}`); // نمایش نتیجه برگردانده شده از Function 1

    const result4 = call(DatabaseModuleNames.Function2, "yet another test"); // صدا زدن دوباره "Function 2" با یک پارامتر
    console.log(`Function 2 returned: ${result4}`); // نمایش نتیجه برگردانده شده از Function 2
})();
