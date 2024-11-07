import { mysqlConnection } from "../index.js";
import { CREATE_TABLES } from "../sql/book.js";

export default function (): Promise<boolean> {
  return new Promise((resolve, reject) => {
    mysqlConnection.connect(function (err: any) {
      if (err) throw err;
      console.log("[database] connected to Mysql!");

      console.log("[database] check table..!");
      mysqlConnection.query(CREATE_TABLES, function (err: any, result: any) {
        if (err) throw err;
        console.log("[database] table checked!");
        return true;
      });
    });
  });
}
