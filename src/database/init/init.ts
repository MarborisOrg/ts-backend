
import CREATE_DATABASE_INIT from "./create_database"
import { mysqlConnection } from "../../config/conn";
import { CREATE_TABLES } from "../../../sql/book";

export default function () {
  try {
    CREATE_DATABASE_INIT(); // check database

    mysqlConnection.connect(function (err: any) {
      if (err) throw err;
      console.log("[database] connected to Mysql!");
    });

    // table
    (function () {
      console.log("[database] check table..!");

      mysqlConnection.query(CREATE_TABLES, function (err: any, result: any) {
        if (err) throw err;
        console.log("[database] table checked!");
      });

    })();

  } catch (e: any) {
  }

}
