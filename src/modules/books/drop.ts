
// get book
import { DROP_BOOKS_TABLE } from "../../mysql/sql/book";
import { mysqlConnection } from "../../mysql";

export function dropBooks(): Promise<any> {
    return new Promise((resolve, reject) => {

        mysqlConnection.query(DROP_BOOKS_TABLE, function (err: any, results: any) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
