
const CREATE_TABLES = `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    descrp VARCHAR(255),
    UNIQUE (title, descrp)
    );
`;

const INSERT_BOOKS = "INSERT INTO books (title, descrp) VALUES (?, ?)";
const SELECT_BOOKS = "SELECT * FROM books WHERE title = ?";
const DROP_BOOKS_TABLE = "DROP TABLE IF EXISTS books;";

export {
    CREATE_TABLES, INSERT_BOOKS, SELECT_BOOKS, DROP_BOOKS_TABLE
};