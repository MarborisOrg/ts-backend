// check and init database
import cuse from './c-use.js';

import MONGO from '#databases/mongo/service';
import ConnectToMysql from '#databases/mysql/use/index';

export default async function (): Promise<void> {
  const dbUse = cuse();

  if (dbUse === 'mongo') {
    await MONGO();
  } else if (dbUse === 'mysql') {
    await ConnectToMysql();
  }
}
