import { mdb } from '../config/knex.js';

export async function freeMysql(): Promise<void> {
  if (mdb != undefined) await mdb.destroy();
  echo('Success: Mysql now free');
}
