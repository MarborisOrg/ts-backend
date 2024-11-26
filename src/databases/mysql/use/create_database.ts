// import { con } from '../index.js';
// import {
//   CHECK_DATABASE,
//   CR_ALERT,
//   CR_FLUSH,
//   CR_USE,
//   CREATE_DATABASE,
// } from '../sql/init.js';
// export default function (): Promise<boolean> {
//   return new Promise((resolve, reject) => {
//     function errEnd(err: any) {
//       con.end();
//       return reject(err);
//     }

//     con.connect(function (err: any) {
//       if (err) {
//         errEnd(err);
//       }
//       // log.info("[database1] connected!");
//       con.query(CHECK_DATABASE, function (err: any, results: any) {
//         if (err) {
//           errEnd(err);
//         } else {
//           try {
//             if (results.length === 0) {
//               con.query(CREATE_DATABASE, function (err: any, _result: any) {
//                 if (err) {
//                   errEnd(err);
//                 } else {
//                   log.info('[database1] Database created successfully.');
//                   con.query(CR_USE, function (err: any) {
//                     if (err) {
//                       errEnd(err);
//                     }
//                     con.query(CR_ALERT, function (err: any) {
//                       if (err) {
//                         errEnd(err);
//                       }
//                       con.query(CR_FLUSH, function (err: any) {
//                         if (err) {
//                           errEnd(err);
//                         }
//                         log.info(
//                           '[database1] User altered and privileges flushed successfully.',
//                         );
//                         con.end();
//                         resolve(true);
//                       });
//                     });
//                   });
//                 }
//               });
//             } else {
//               // log.info('[database1] Database already exists. Skipping user alteration.');
//               con.end();
//               resolve(true);
//             }
//           } catch (error) {
//             log.error('Error executing queries:', error);
//             errEnd(err);
//           }
//         }
//       });
//     });
//   });
// }

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
