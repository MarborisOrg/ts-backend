import { initializeMdb, mdb } from '../config/knex.js';

import { config } from '#config/env_get';

export async function initializeMysqlDatabase(): Promise<boolean> {
  try {
    const databaseExists = await mdb.raw('SHOW DATABASES LIKE ?', [
      config.database_name,
    ]);

    if (databaseExists[0].length === 0) {
      await mdb.raw(`CREATE DATABASE ??`, [config.database_name]);
      console.log('[database1] Database created successfully.');
    } else {
      console.log('[database1] Database already exists. Skipping creation.');
    }

    await mdb.raw(`USE ??`, [config.database_name]);

    initializeMdb();

    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}
