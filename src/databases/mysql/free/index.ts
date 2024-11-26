// import { mysqlConnection } from '#databases/mysql/index';

import { mdb } from "../config/knex.js";

export async function freeMysql() {
  // mysqlConnection.end();
  await mdb.destroy();
}
