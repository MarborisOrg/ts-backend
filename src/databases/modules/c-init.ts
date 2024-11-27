// check and init database

import cuse from './c-use.js';

import MONGO from '#databases/mongo/service';
// import { dropBooks } from '#databases/mysql/modules/drop';
import ConnectToMysql from '#databases/mysql/use/index';

const dbUse = cuse();

export default async function (): Promise<void> {
  if (dbUse === 'mongo') {
    await MONGO();
  } else if (dbUse === 'mysql') {
    await ConnectToMysql();
    // dropBooks()
  } else {
    quit();
  }
}
