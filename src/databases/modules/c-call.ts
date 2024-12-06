/**
 * @author MRB
 * @license UNLICENSED
 * @link https://github.com/S-MRB-S
 *
 * This module provides a function to call database-specific functions based on the current database context.
 * It supports both MongoDB and MySQL functions and handles the invocation of these functions with the provided arguments.
 */

import { databasesArray } from '#databases/modules';
import { MongoModuleNames, MysqlModuleNames } from '#ts.enums';

const dbUse = $.cuse(); // Get the current database context

/**
 * Calls a specified function from the current database context with the provided arguments.
 *
 * @param functionName - The name of the function to call, which can be a string or an enum value for MongoDB/MySQL.
 * @param args - The arguments to pass to the function. The last argument can be a boolean to prevent repeated calls.
 * @returns A Promise that resolves to the result of the function call.
 * @throws Will assert if the specified function or database row is not found.
 */
export async function call(
  functionName: string | MongoModuleNames | MysqlModuleNames,
  ...args: readonly any[]
): Promise<any> {
  const noRepeat = args[args.length - 1] === false; // Check if the last argument is false to prevent repeat calls
  if (noRepeat) {
    args = args.slice(0, -1); // Remove the last argument if it's false
  }

  // Filter the database array to find the current database row
  const rows = databasesArray.filter((r) => r.name === dbUse);

  if (rows.length === 0) {
    assert('[M40]: Row not found'); // Assert if no row is found for the current database
  }

  try {
    // Find functions that match the specified function name in the current database row
    const namedFunctions = rows.flatMap(
      (row) =>
        row.modules
          .filter((f) => f.name === functionName)
          .map((f) => ({ ...f, rowName: row.name })) // Attach the row name to the function object
    );

    if (namedFunctions.length > 0) {
      if (noRepeat) {
        const firstFunction = namedFunctions[0]; // Get the first matching function
        log.info(
          `Calling ${firstFunction.name} from ${firstFunction.rowName}:`
        );
        const result = await firstFunction.func(...args); // Call the function with the provided arguments
        return result; // Return the result of the function call
      } else {
        // Call all matching functions and wait for their results
        const results = namedFunctions.map((namedFunction): Promise<any> => {
          log.info(
            `Calling ${namedFunction.name} from ${namedFunction.rowName}:`
          );
          return namedFunction.func(...args); // Call each function with the provided arguments
        });
        const res = await Promise.all(results); // Wait for all promises to resolve
        return res; // Return the results of all function calls
      }
    } else {
      assert(`Function ${functionName} not found in ${dbUse}.`); // Assert if no matching function is found
    }
  } finally {
    // Optionally handle caching or locking mechanisms here
    // row.called = true; // Uncomment to mark the row as called
    // or we can add defer, or lock (like guard lock (C++))
  }
}
