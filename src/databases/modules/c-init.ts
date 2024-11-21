// check and init database

import cuse from '../../modules/c-use.js';

import MONGO from '#databases/mongo/service';
import ConnectToMysql from '#databases/mysql/use/index';

const dbUse = cuse();

export default async function () {
  if (dbUse === 'mongo') {
    await MONGO();
  } else if (dbUse === 'mysql') {
    await ConnectToMysql();
  } else {
    quit();
  }
}
