
// save book

import { mysqlConnection, con } from "../conn";

export default function (title: string, description: string): void {
// save the book

mysqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Saving a book, t: " + title + " desc: " + description);
  
    var sql = "INSERT INTO books (title, descrp) VALUES ('" + title + "', '" + description + "')";
    
    mysqlConnection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("[saving] 1 record inserted");
    });
  });
  

}