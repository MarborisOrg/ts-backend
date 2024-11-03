import { mysqlConnection } from "../config/conn";
import { CREATE_TABLES } from "../sql/book";

export default function () {
    mysqlConnection.connect(function (err: any) {
        if (err) throw err;
        console.log("[database] connected to Mysql!");

        console.log("[database] check table..!");
        mysqlConnection.query(CREATE_TABLES, function (err: any, result: any) {
            if (err) throw err;
            console.log("[database] table checked!");
        });
    });
}