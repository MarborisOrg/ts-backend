import { initializeMdb, mdb } from '../config/knex.js';

import { env_config } from '#config/env.service.js';

export async function initializeMysqlDatabase(): Promise<boolean> {
  try {
    const databaseExists = await mdb.raw('SHOW DATABASES LIKE ?', [
      env_config.database_name,
    ]);

    if (databaseExists[0].length === 0) {
      await mdb.raw(`CREATE DATABASE ??`, [env_config.database_name]);
      console.log('[database1] Database created successfully.');
    } else {
      console.log('[database1] Database already exists. Skipping creation.');
    }

    await mdb.raw(`USE ??`, [env_config.database_name]);

    initializeMdb(env_config.database_name);

    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}
