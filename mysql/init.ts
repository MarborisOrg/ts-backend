
import { con } from "./conn";

export default function () {
    con.connect(function (err: any) {
        if (err) throw err;
        console.log("Connected to Mysql!");
    });
}
