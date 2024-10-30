import mysql from "mysql";

export const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mehrab1104"
});

export const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mehrab1104",
  database: "mrb", // created before
  multipleStatements: true,
});