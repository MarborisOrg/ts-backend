// import { mysqlConnection } from '../index.js';
// import { CREATE_TABLES } from '../sql/book.js';

// export default function (): Promise<boolean> {
//   return new Promise((resolve, _reject) => {
//     mysqlConnection.connect(function (err: any) {
//       if (err) assert(err);
//       mysqlConnection.query(CREATE_TABLES, function (err: any, _result: any) {
//         if (err) assert(err);
//         resolve(true);
//       });
//     });
//   });
// }

import { mdb } from '../config/knex.js';

import { config } from '#config/env_get';

export const createTable = async () => {
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
