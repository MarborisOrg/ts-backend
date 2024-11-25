import knex from 'knex';

import knexConfig from './knexfile';

const db = knex(knexConfig.development);

async function setupDatabase() {
  try {
    await db.raw('CREATE DATABASE IF NOT EXISTS ??', [knexConfig.development.connection.database]);
    await db.raw('USE ??', [knexConfig.development.connection.database]);

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
