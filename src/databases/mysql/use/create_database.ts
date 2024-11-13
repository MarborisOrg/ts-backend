import {
  CREATE_DATABASE,
  CR_ALERT,
  CR_FLUSH,
  CR_USE,
  CHECK_DATABASE,
} from "../sql/init.js";
import { con } from "../index.js";

export default function (): Promise<boolean> {
  return new Promise((resolve, reject) => {
    function errend(err: any) {
      con.end();
      return reject(err);
    }

    con.connect(function (err: any) {
      if (err) {
        errend(err);
      }
      // log.info("[database1] connected!");
      con.query(CHECK_DATABASE, function (err: any, results: any) {
        if (err) {
          errend(err);
        } else {
          try {
            if (results.length === 0) {
              con.query(CREATE_DATABASE, function (err: any, result: any) {
                if (err) {
                  errend(err);
                } else {
                  log.info("[database1] Database created successfully.");
                  con.query(CR_USE, function (err: any) {
                    if (err) {
                      errend(err);
                    }
                    con.query(CR_ALERT, function (err: any) {
                      if (err) {
                        errend(err);
                      }
                      con.query(CR_FLUSH, function (err: any) {
                        if (err) {
                          errend(err);
                        }
                        log.info(
                          "[database1] User altered and privileges flushed successfully."
                        );
                        con.end();
                        resolve(true);
                      });
                    });
                  });
                }
              });
            } else {
              // log.info('[database1] Database already exists. Skipping user alteration.');
              con.end();
              resolve(true);
            }
          } catch (error) {
            log.error("Error executing queries:", error);
            errend(err)
          }
        }
      });
    });
  });
}
