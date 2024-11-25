import knex from 'knex';

import config from './knexfile';

const db = knex(config.development);

async function setupDatabase() {
  try {
    await db.raw('CREATE DATABASE IF NOT EXISTS ??', [config.development.connection.database]);
    await db.raw('USE ??', [config.development.connection.database]);

    const hasTable = await db.schema.hasTable('your_table_name');
    if (!hasTable) {
      await db.schema.createTable('your_table_name', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('age').nullable();
      });
      console.log('Table created: your_table_name');
    } else {
      console.log('Table already exists: your_table_name');
    }

  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await db.destroy();
  }
}

setupDatabase();
