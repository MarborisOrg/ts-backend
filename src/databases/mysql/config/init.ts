import knex from 'knex';

import knexConfig from './knexfile';

import { config } from '#config/env_get';

export const mdb = knex(knexConfig.development);

export async function initializeMysqlDatabase(): Promise<boolean> {
  try {
    const databaseExists = await mdb.raw("SHOW DATABASES LIKE ?", [knexConfig.development.connection.database]);

    if (databaseExists[0].length === 0) {
      await mdb.raw(`CREATE DATABASE ??`, [knexConfig.development.connection.database]);
      console.log('[database1] Database created successfully.');

      await mdb.raw(`USE ??`, [knexConfig.development.connection.database]);

      await mdb.raw(
        `ALTER USER ?@? IDENTIFIED WITH mysql_native_password BY ?`,
        [knexConfig.development.connection.database, knexConfig.development.connection.host, knexConfig.development.connection.password]
      );

      await mdb.raw(`FLUSH PRIVILEGES;`);
      console.log('[database1] User altered and privileges flushed successfully.');
    } else {
      console.log('[database1] Database already exists. Skipping user alteration.');
    }

    const hasTable = await mdb.schema.hasTable(config.tc_book_name);
    if (!hasTable) {
      await mdb.schema.createTable(config.tc_book_name, (table) => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.string('description', 255).nullable();
      });
      console.log('Table created: ' + config.tc_book_name);
    } else {
      console.log('Table already exists: ' + config.tc_book_name);
    }

    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}
