
import { con } from "./mysql/conn";

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mrb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});