import { mdb } from '../config/knex.js';

import { config } from '#config/env_get';

const INSERT_BOOKS = (title: string, description: string) =>
  mdb(config.tc_book_name).insert({ title, description });

const SELECT_BOOKS = (id: number) =>
  mdb(config.tc_book_name).where({ id }).first();

const SELECT_ALL_BOOKS = () => mdb(config.tc_book_name).select('*');

const DROP_BOOKS_TABLE = () =>
  mdb.schema.dropTableIfExists(config.tc_book_name);

const DELETE_BOOK = (id: number) =>
  mdb(config.tc_book_name).where({ id }).del();

export {
  DELETE_BOOK,
  DROP_BOOKS_TABLE,
  INSERT_BOOKS,
  SELECT_ALL_BOOKS,
  SELECT_BOOKS,
};
