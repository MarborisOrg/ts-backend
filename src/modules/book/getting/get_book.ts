
// get book
import { mysqlConnection } from "../../../config/conn";

export function findBookByTitle(title: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM books WHERE title = ?";

        mysqlConnection.query(sql, [title], function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
