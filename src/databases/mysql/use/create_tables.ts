import { mdb } from '../config/knex.js';

import { config } from '#config/env_get';

export const createTable = async (): Promise<void> => {
  try {
    const exists = await mdb.schema.hasTable(config.tc_book_name);
    if (!exists) {
      await mdb.schema.createTable(config.tc_book_name, (table) => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.string('description', 255).notNullable();
      });
      console.log('New table created: ' + config.tc_book_name);
    } else {
      console.log('Table already exists: ' + config.tc_book_name);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
};
