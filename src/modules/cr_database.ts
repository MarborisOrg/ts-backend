
import { CREATE_DATABASE } from "../mysql/sql/init";
import { con } from "../mysql";

export function create_check_database(): Promise<any> {
    return new Promise((resolve, reject) => {

        con.query(CREATE_DATABASE, function (err: any, results: any) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
