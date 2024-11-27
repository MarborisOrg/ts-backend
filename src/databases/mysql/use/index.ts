// import CREATE_DATABASE_INIT from './create_database.js';
// import CREATE_TABLE_INIT from './create_tables.js';

import { initializeMysqlDatabase } from './create_database.js';
import { createTable } from './create_tables.js';

/**
 * init MYSQL database for use
 *
 * @author MRB
 */
export default async function (): Promise<void> {
  try {
    // const results = await CREATE_DATABASE_INIT(); // check database
    // if (results) {
    //   await CREATE_TABLE_INIT(); // check tables
    // } else {
    //   assert('[database] Mysql err!');
    // }
    await initializeMysqlDatabase();
    await createTable();
  } catch (_) {
    quit();
  }
}
