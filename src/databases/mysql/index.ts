import mysql from "mysql2";
import { config } from "../../config/env_get.js";

// Just for create database file
export const con = mysql.createConnection({
  host: config.mysql_sv,
  user: config.mysql_user,
  password: config.mysql_password,
});

export const mysqlConnection = mysql.createConnection({
  host: config.mysql_sv,
  user: config.mysql_user,
  password: config.mysql_password,
  database: config.database_name, // created before
  multipleStatements: config.mysql_multipleStatements,
});
