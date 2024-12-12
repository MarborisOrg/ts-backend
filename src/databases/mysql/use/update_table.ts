// import { mdb } from '../config/knex.js';

// import { createTable } from './create_tables.js';

// import { config } from './config/env_get';

// export const updateTable = async () => {
//   try {
//     const hasTable = await mdb.schema.hasTable(config.tc_book_name);
//     if (hasTable) {
//       let backupTableName = `${config.tc_book_name}_backup`;

//       const getUniqueBackupTableName = async (
//         baseName: string,
//         count = 1
//       ): Promise<string> => {
//         const tableName = count === 1 ? baseName : `${baseName}_${count}`;
//         const exists = await mdb.schema.hasTable(tableName);
//         return exists
//           ? getUniqueBackupTableName(baseName, count + 1)
//           : tableName;
//       };

//       backupTableName = await getUniqueBackupTableName(
//         `${config.tc_book_name}_backup`
//       );

//       await mdb.raw(`RENAME TABLE ?? TO ??`, [
//         config.tc_book_name,
//         backupTableName,
//       ]);
//       console.log(`Table renamed to: ${backupTableName}`);
//     }

//     await createTable();
//   } catch (error) {
//     console.error('Error occurred:', error);
//   }
// };
