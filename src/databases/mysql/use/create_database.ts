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

import knex from 'knex';

import { config } from '#config/env_get';

const db = knex({
  client: 'mysql2',
  connection: {
    host: config.mysql_sv,
    user: config.database_name,
    password: config.mysql_password,
  },
});

async function initializeDatabase(): Promise<boolean> {
  try {
    // بررسی وجود دیتابیس
    const databaseExists = await db.raw("SHOW DATABASES LIKE ?", [config.database_name]);

    if (databaseExists[0].length === 0) {
      // ایجاد دیتابیس اگر وجود نداشته باشد
      await db.raw(`CREATE DATABASE IF NOT EXISTS ??`, [config.database_name]);
      console.log('[database1] Database created successfully.');

      // استفاده از دیتابیس
      await db.raw(`USE ??`, [config.database_name]);

      // تغییر رمز عبور کاربر
      await db.raw(
        `ALTER USER ?@? IDENTIFIED WITH mysql_native_password BY ?`,
        [config.database_name, config.mysql_sv, config.mysql_password]
      );

      // بارگذاری مجوزها
      await db.raw(`FLUSH PRIVILEGES;`);
      console.log('[database1] User altered and privileges flushed successfully.');
    } else {
      console.log('[database1] Database already exists. Skipping user alteration.');
    }

    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await db.destroy(); // بستن اتصال
  }
}

initializeDatabase()
  .then(() => console.log('Database initialization completed.'))
  .catch((error) => console.error('Database initialization failed:', error));
