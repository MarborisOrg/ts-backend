import { config } from "../../../config/env_get.js";

const CREATE_TABLES =
  `CREATE TABLE IF NOT EXISTS ` +
  config.tc_book_name +
  ` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    descrp VARCHAR(255),
    UNIQUE (title, descrp)
    );
`;

const INSERT_BOOKS =
  "INSERT INTO " + config.tc_book_name + " (title, descrp) VALUES (?, ?)";
const SELECT_BOOKS =
  "SELECT * FROM " + config.tc_book_name + " WHERE title = ?";
const DROP_BOOKS_TABLE = "DROP TABLE IF EXISTS " + config.tc_book_name + ";";

export { CREATE_TABLES, INSERT_BOOKS, SELECT_BOOKS, DROP_BOOKS_TABLE };
