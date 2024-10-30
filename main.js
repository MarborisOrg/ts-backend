
// Router

const express = require('express')
const app = express()

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "mrb",
  password: "Mehrab1104"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/save', function (req, res) {
  res.send('Connection')
})

app.listen(3000)
