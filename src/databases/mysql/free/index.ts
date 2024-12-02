import { mdb } from '../config/knex.js';

export async function freeMysql(): Promise<void> {
  await mdb.destroy();
  echo('Success: Mysql now free');
}
