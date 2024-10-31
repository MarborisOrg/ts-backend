
// save book

import { mysqlConnection } from "../../../config/conn";

export function saveBook (title: string, description: string): boolean {
    // save the book

    console.log("Saving a book, t: " + title + " desc: " + description);

    var sql = "INSERT INTO books (title, descrp) VALUES ('" + title + "', '" + description + "')";

    mysqlConnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("[saving] 1 record inserted");
        return true;
    });

    return false;
}