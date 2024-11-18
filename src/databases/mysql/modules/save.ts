import { DUPLICATE_TABLE } from '#databases/mysql/codes';
import { mysqlConnection } from '#databases/mysql/index';
import { INSERT_BOOKS } from '#databases/mysql/sql/book';

export function saveBook(title: string, description: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    log.info('Saving a book, t: ' + title + ' desc: ' + description);

    mysqlConnection.query(
      INSERT_BOOKS,
      [title, description],
      function (err: any, _result: any) {
        if (err) {
          if (err.code === DUPLICATE_TABLE) {
            log.error(
              'Duplicate entry error: A book with this title already exists.',
            );
            resolve(false);
          } else {
            log.error('Error inserting record: ', err);
            reject(err);
          }
        } else {
          log.info('[saving] 1 record inserted');
          resolve(true);
        }
      },
    );
  });
}
