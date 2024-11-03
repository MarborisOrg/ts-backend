
import { CREATE_DATABASE } from "../../sql/init";
import { con } from "../config/conn";

export default function (): Promise<boolean> {
  return new Promise((resolve, reject) => {

    con.connect(function (err: any) {
      if (err) reject(err);
      console.log("[database1] connected!");
      con.query(CREATE_DATABASE, function (err: any, result: any) {
        if (err) {
          reject(err);
        } else {
          console.log("[database1] checked!");
          con.end(); // check and exit
          console.log("[database1] closed!");
          resolve(true);
        }
      });
    });

  });
}

/**
 * ALTER USER 'mrb'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
 * flush privileges;
 * 
 * var sql = "CREATE TABLE IF NOT EXISTS books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), descrp VARCHAR(255))";
 */