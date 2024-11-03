
// by MRB

import express from "express";
import { config } from "./config/get";
import booksRouter from "./routers/books";

import "./init"; // init

// app (express)
const app = express()

app.use(express.json());

app.use('/book', booksRouter);

app.listen(config.PORT, () => {
  console.log("Server connected, port: " + config.PORT)
});
