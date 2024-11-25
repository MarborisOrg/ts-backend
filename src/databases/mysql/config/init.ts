import knex from 'knex';

import knexConfig from './knexfile';

import { config } from '#config/env_get';

const db = knex(knexConfig.development);

async function initializeDatabase(): Promise<boolean> {
  try {
    const databaseExists = await db.raw("SHOW DATABASES LIKE ?", [knexConfig.development.connection.database]);

    if (databaseExists[0].length === 0) {
      await db.raw(`CREATE DATABASE IF NOT EXISTS ??`, [knexConfig.development.connection.database]);
      console.log('[database1] Database created successfully.');

      await db.raw(`USE ??`, [knexConfig.development.connection.database]);

      await db.raw(
        `ALTER USER ?@? IDENTIFIED WITH mysql_native_password BY ?`,
        [knexConfig.development.connection.database, knexConfig.development.connection.host, knexConfig.development.connection.password]
      );

      await db.raw(`FLUSH PRIVILEGES;`);
      console.log('[database1] User altered and privileges flushed successfully.');
    } else {
      console.log('[database1] Database already exists. Skipping user alteration.');
    }

    const hasTable = await db.schema.hasTable(config.tc_book_name);
    if (!hasTable) {
      await db.schema.createTable(config.tc_book_name, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('age').nullable();
      });
      console.log('Table created: ' + config.tc_book_name);
    } else {
      console.log('Table already exists: ' + config.tc_book_name);
    }

    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

initializeDatabase()
  .then(() => console.log('Database initialization completed.'))
  .catch((error) => console.error('Database initialization failed:', error));
