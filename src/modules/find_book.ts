
// get book
import { SELECT_BOOKS } from "../sql/book";
import { mysqlConnection } from "../mysql";

export function findBookByTitle(title: string): Promise<any> {
    return new Promise((resolve, reject) => {

        mysqlConnection.query(SELECT_BOOKS, [title], function (err: any, results: any) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
