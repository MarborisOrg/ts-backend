// get book
import { SELECT_ALL_BOOKS, SELECT_BOOKS } from '#databases/mysql/sql/book';

export type Book = {
  readonly id: number;
  readonly title: string;
  readonly description: string;
};

export function findBookById(id: number): Promise<Book | null> {
  return new Promise((resolve, reject) => {
    SELECT_BOOKS(id)
      .then((book) => {
        return resolve(book || null);
      })
      .catch(() => {
        reject('Failed to find book');
      });
  });
}

export function findAllBooks(
  limit: number,
  page: number
): Promise<readonly Book[]> {
  return new Promise((resolve, reject) => {
    SELECT_ALL_BOOKS(limit, page)
      .then((books) => {
        resolve(books);
      })
      .catch(() => {
        reject('Failed to retrieve all books');
      });
  });
}
