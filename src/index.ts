
// Router project, by MRB

// imports

// load global utils module:

import express from "express";
import { config } from "./config/get";
import booksRouter from "./routers/books";

import "./init"; // init

// app (express)
const app = express()

app.use(express.json());

app.use('/book', booksRouter);

app.listen(config.PORT, () => {
  console.log("Server trying to connect port: " + config.PORT)
});
