
import { mysqlConnection, con } from "./conn";
import CRDT from "./create_database"

export default function () {
  try {
    CRDT(); // create database for first time

    mysqlConnection.connect(function (err: any) {
      if (err) throw err;
      console.log("Connected to Mysql!");
    });

    // table
    (function () {
      console.log("Check table..!");
      // title, descrp
      var sql = "CREATE TABLE IF NOT EXISTS books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), descrp VARCHAR(255))";
      mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table checked!");
      });
    })();

  } catch (e: any) {
  }

}
