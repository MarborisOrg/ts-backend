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
