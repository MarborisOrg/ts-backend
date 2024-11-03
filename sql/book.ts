import { config } from "../src/config/get";

const CREATE_DATABASE = "CREATE DATABASE IF NOT EXISTS " + config.database;

const CREATE_TABLES = `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    descrp VARCHAR(255),
    UNIQUE (title, descrp)
    );
`;

export {
    CREATE_TABLES, CREATE_DATABASE
};