import { DUPLICATE_TABLE } from '#databases/mysql/codes';
import { INSERT_BOOKS } from '#databases/mysql/sql/book';

export function saveBook(title: string, description: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    console.info('Saving a book, t: ' + title + ' desc: ' + description);
    INSERT_BOOKS(title, description)
      .then(() => {
        console.info('[saving] 1 record inserted');
        resolve(true);
      })
      .catch((err) => {
        if (err.code === DUPLICATE_TABLE) { // بررسی خطای تکراری
          console.error('Duplicate entry error: A book with this title already exists.');
          resolve(false);
        } else {
          console.error('Error inserting record: ', err);
          reject('Failed to save book');
        }
      });
  });
}
