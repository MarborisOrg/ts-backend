import { mdb } from '../config/knex.js';
import { Book } from '../modules/find.js';

import { env_config } from '#config/env.service.js';

const INSERT_BOOKS: (title: string, description: string) => Promise<number> = (
  title,
  description
) => mdb(env_config.tc_book_name).insert({ title, description });

const SELECT_BOOKS: (id: number) => Promise<Book | undefined> = (id) =>
  mdb(env_config.tc_book_name).where({ id }).first();

const SELECT_ALL_BOOKS = (
  limit: number = 10,
  page: number = 1
): Promise<Book[]> => {
  const query = mdb(env_config.tc_book_name).select('*');

  if (limit > 0) {
    query.limit(limit);
  }

  if (page > 0) {
    const offset = (page - 1) * (limit > 0 ? limit : 10);
    query.offset(offset);
  }

  return query;
};

const DROP_BOOKS_TABLE: () => Promise<void> = () =>
  mdb.schema.dropTableIfExists(env_config.tc_book_name);

const DELETE_BOOK: (id: number) => Promise<number> = (id) =>
  mdb(env_config.tc_book_name).where({ id }).del();

export {
  DELETE_BOOK,
  DROP_BOOKS_TABLE,
  INSERT_BOOKS,
  SELECT_ALL_BOOKS,
  SELECT_BOOKS,
};
