
import { CREATE_DATABASE } from "../../../sql/init";
import { con } from "../../config/conn";

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
