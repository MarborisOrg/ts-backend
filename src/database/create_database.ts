
import { CREATE_DATABASE, CR_ALERT, CR_FLUSH, CR_USE } from "../../sql/init";
import { con } from "../config/conn";
import mysql from "mysql2";

export default function (): Promise<boolean> {
  return new Promise((resolve, reject) => {

    con.connect(function (err: any) {
      if (err) reject(err);
      console.log("[database1] connected!");
      // con.query(CREATE_DATABASE, function (err: any, result: any) {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     console.log("[database1] checked!");
      //     con.end(); // check and exit
      //     console.log("[database1] closed!");
      //     resolve(true);
      //   }
      // });

      try {
        const result = con.query(CREATE_DATABASE) as unknown as [mysql.ResultSetHeader];
  
        if (result[0].affectedRows > 0) {
          console.log('Database created successfully.');
          con.query(CR_USE);
          con.query(CR_ALERT);
          con.query(CR_FLUSH);
          console.log('User altered and privileges flushed successfully.');
        } else {
          console.log('Database already exists. Skipping user alteration.');
        }
      } catch (error) {
        console.error('Error executing queries:', error);
        resolve(false);
      } finally {
        con.end();
        resolve(true);
      }

    });

  });
}
