import { INSERT_BOOKS } from "../../databases/mysql/sql/book.js";
import { DUPLICATE_TABLE } from "../../databases/mysql/codes.js";
import { mysqlConnection } from "../../databases/mysql/index.js";

export function saveBook(title: string, description: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log("Saving a book, t: " + title + " desc: " + description);

        mysqlConnection.query(INSERT_BOOKS, [title, description], function (err: any, result: any) {
            if (err) {
                if (err.code === DUPLICATE_TABLE) {
                    console.error("Duplicate entry error: A book with this title already exists.");
                    resolve(false);
                } else {
                    console.error("Error inserting record: ", err);
                    reject(err);
                }
            } else {
                console.log("[saving] 1 record inserted");
                resolve(true);
            }
        });
    });
}
