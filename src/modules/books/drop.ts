
// get book
import { DROP_BOOKS_TABLE } from "../../databases/mysql/sql/book";
import { mysqlConnection } from "../../databases/mysql";

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
