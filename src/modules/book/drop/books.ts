
// get book
import { mysqlConnection } from "../../../config/conn";

export function dropBooks(): Promise<any> {
    return new Promise((resolve, reject) => {
        var sql = "DROP TABLE IF EXISTS books;";

        mysqlConnection.query(sql, function (err: any, results: any) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
