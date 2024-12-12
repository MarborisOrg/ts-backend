// get book
import {
  DELETE_BOOK,
  DROP_BOOKS_TABLE,
  SELECT_BOOKS,
} from './databases/mysql/sql/book';

export function dropBooks(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    DROP_BOOKS_TABLE()
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject('Failed to drop books table');
      });
  });
}

export function deleteBookById(id: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    SELECT_BOOKS(id)
      .then((book): any => {
        if (!book) {
          return reject('Book not found');
        }
        return DELETE_BOOK(id);
      })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject('Failed to delete book');
      });
  });
}
