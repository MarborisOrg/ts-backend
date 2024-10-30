
import { mysqlConnection, con } from "./conn";
import CRDT from "./create_daabase"

export default function () {
    // mysqlConnection.connect(function (err: any) {
    //     if (err) throw err;
    //     console.log("Connected to Mysql!");
    // });

    try {
      CRDT(); // create database for first time

      mysqlConnection.connect(function(err) {
          if (err) throw err;
          console.log("Check table..!");
          // title, descrp
          var sql = "CREATE TABLE IF NOT EXISTS book (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), descrp VARCHAR(255))";
          mysqlConnection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table checked!");
          });
        });
  }catch(e: any){
  }

}

(function() {
    // try {
    //     CRDT(); // create database for first time

    //     mysqlConnection.connect(function(err) {
    //         if (err) throw err;
    //         console.log("Create table!");
    //         // title, descrp
    //         var sql = "CREATE TABLE IF NOT EXISTS book (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), descrp VARCHAR(255))";
    //         mysqlConnection.query(sql, function (err, result) {
    //           if (err) throw err;
    //           console.log("Table created");
    //         });
    //       });
    // }catch(e: any){
    // }
  })();

