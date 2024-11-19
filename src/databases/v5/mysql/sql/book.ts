import { config } from '#config/env_get';

const CREATE_TABLES =
  `CREATE TABLE IF NOT EXISTS ` +
  config.tc_book_name +
  ` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    UNIQUE (title, description)
    );
`;

const INSERT_BOOKS =
  'INSERT INTO ' + config.tc_book_name + ' (title, description) VALUES (?, ?)';
const SELECT_BOOKS =
  'SELECT * FROM ' + config.tc_book_name + ' WHERE title = ?';
const DROP_BOOKS_TABLE = 'DROP TABLE IF EXISTS ' + config.tc_book_name + ';'; // + no default for this module

export { CREATE_TABLES, INSERT_BOOKS, SELECT_BOOKS, DROP_BOOKS_TABLE };
