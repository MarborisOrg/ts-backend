import { mysqlConnection } from "../../../config/conn";

export function saveBook(title: string, description: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log("Saving a book, t: " + title + " desc: " + description);

        var sql = "INSERT INTO books (title, descrp) VALUES (?, ?)";

        mysqlConnection.query(sql, [title, description], function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log("[saving] 1 record inserted");
                resolve(true);
            }
        });
    });
}
