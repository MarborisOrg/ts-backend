// get book
import { mysqlConnection } from '#databases/mysql/index';
import { SELECT_BOOKS } from '#databases/mysql/sql/book';

export function findBookByTitle(title: string): Promise<any> {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      SELECT_BOOKS,
      [title],
      function (err: any, results: any) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      },
    );
  });
}
