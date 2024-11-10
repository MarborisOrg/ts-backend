import { config } from "#config/env_get";
import booksRouter from "#routes/index";
import express from "express";

import "#init/index"; // init
import { helmetConfig } from "#config/helment";

export function expressApp() {
  // app (express)
  const app = express();

  app.use(helmetConfig()); // helment helper
  app.use(express.json()); // json

  app.use(express.urlencoded({ extended: true })); // options
  app.use("/", booksRouter); // book router

  app.listen(config.PORT, () => {
    console.log("Server connected, port: " + config.PORT);
  });
}
