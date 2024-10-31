
// get book
import { mysqlConnection } from "../../../config/conn";

export function findBookByTitle(title: string): string {
    var sql = "SELECT * FROM books WHERE title = ?";

    mysqlConnection.query(sql, [title], function (err, results) {
        if (err) throw err;
        return results;
    });

    return "";
}
