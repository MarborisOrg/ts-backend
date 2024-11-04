
import { CREATE_DATABASE, CR_ALERT, CR_FLUSH, CR_USE, CHECK_DATABASE } from "../../sql/init";
import { con } from "..";

export default function (): Promise<boolean> {
  return new Promise((resolve, reject) => {

    con.connect(function (err: any) {
      if (err) reject(err);
      // console.log("[database1] connected!");
      con.query(CHECK_DATABASE, function (err: any, results: any) { // Check database name
        if (err) {
          reject(err);
        } else {

          try {
            if (results.length === 0) {
              con.query(CREATE_DATABASE, function (err: any, result: any) {
                if (err) {
                  reject(err);
                } else {
                  console.log('[database1] Database created successfully.');
                  con.query(CR_USE);
                  con.query(CR_ALERT);
                  con.query(CR_FLUSH);
                  console.log('[database1] User altered and privileges flushed successfully.');
                  resolve(true);
                }
              });

            } else {
              // console.log('[database1] Database already exists. Skipping user alteration.');
            }
          } catch (error) {
            console.error('Error executing queries:', error);
            resolve(false);
          } finally {
            con.end();
          }

        }
      });
    });
  });
}
