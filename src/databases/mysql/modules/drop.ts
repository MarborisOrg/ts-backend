// get book
import { mysqlConnection } from '#databases/mysql/index';
import {
  DELETE_BOOK,
  DROP_BOOKS_TABLE,
  SELECT_BOOKS,
} from '#databases/mysql/sql/book';

export function dropBooks(): Promise<any> {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(DROP_BOOKS_TABLE, function (err: any, results: any) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

export function deleteBookByTitle(title: string): Promise<any> {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
      SELECT_BOOKS,
      [title],
      function (err: any, results: any) {
        if (err) reject('err');

        if (results.length === 0) {
          reject('not found');
          return;
        }

        try {
          mysqlConnection.query(DELETE_BOOK, [title]);
          resolve('true');
        } catch (err) {
          reject('err in find');
        }
      },
    );
  });
}
