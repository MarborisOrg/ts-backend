// get book
import { mysqlConnection } from '#databases/mysql/index';
import { SELECT_ALL_BOOKS, SELECT_BOOKS } from '#databases/mysql/sql/book';

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

// eslint-disable-next-line functional/prefer-readonly-type
export function findAllBooks(): Promise<any[]> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line functional/prefer-readonly-type
    mysqlConnection.query(SELECT_ALL_BOOKS, function (err: any, results: any[]) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
