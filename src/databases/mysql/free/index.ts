// import { mysqlConnection } from '#databases/mysql/index';

import { mdb } from "../config/init";

export async function freeMysql() {
  // mysqlConnection.end();
  await mdb.destroy();
}
