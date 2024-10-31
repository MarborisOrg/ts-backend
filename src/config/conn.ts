import mysql from "mysql2";
import { config } from "./get";

// Just for create database file
export const con = mysql.createConnection({
  host: config.sv,
  user: config.user,
  password: config.password
});

export const mysqlConnection = mysql.createConnection({
  host: config.sv,
  user: config.user,
  password: config.password,
  database: config.database, // created before
  multipleStatements: config.multipleStatements,
});