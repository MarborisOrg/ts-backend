
// by MRB

import express from "express";
import { config } from "./src/config/get";
import booksRouter from "./src/routers";

import "./src/init"; // init

// app (express)
const app = express()

app.use(express.json());

app.use('/', booksRouter);

app.listen(config.PORT, () => {
  console.log("Server connected, port: " + config.PORT)
});
