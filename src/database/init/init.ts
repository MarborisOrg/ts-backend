
import { mysqlConnection } from "../../config/conn";
import CRDT from "./create_database"

export default function () {
  try {
    CRDT(); // check database

    mysqlConnection.connect(function (err: any) {
      if (err) throw err;
      console.log("Connected to Mysql!");
    });

    // table
    (function () {
      console.log("Check table..!");

      var sql = `CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    descrp VARCHAR(255),
    UNIQUE (title, descrp)
);
`;
      mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table checked!");
      });

    })();

  } catch (e: any) {
  }

}
