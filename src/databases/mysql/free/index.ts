// import { mysqlConnection } from '#databases/mysql/index';

import { mdb } from '../config/knex.js';

export async function freeMysql(): Promise<void> {
  // mysqlConnection.end();
  await mdb.destroy();
}
