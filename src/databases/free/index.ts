// freeDatabases
import { freeMongo } from '../mongo/free/index.js';
import { freeMysql } from '../mysql/free/index.js';

let safeCleanBool = 0;

export async function freeDatabases(): Promise<void> {
  if (safeCleanBool === 1) {
    echo('warn: Memory release failed.');
    return;
  }
  safeCleanBool = 1;
  try {
    echo('warn: free databases connection!');
    void freeMysql();
    await freeMongo();
  } catch (error) {
    echo('error: [core] ERR when free connections: ' + error);
  }
}
