
// get book
import { mysqlConnection } from "../conn";

type getting = {
    title: string
    description: string
}

export default function (title: string) {
    // get the book
    findBookByTitle(title)

}


function findBookByTitle(title: string): void {
    var sql = "SELECT * FROM books WHERE title = ?";

    mysqlConnection.query(sql, [title], function (err, results) {
        if (err) throw err;
        console.log("Books found:", results);
    });
}
