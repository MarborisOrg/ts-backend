import { config } from "#config/env_get";
import booksRouter from "#routes/index";
import express from "express";

import "#init/index"; // init
import { helmetConfig } from "#config/helment";
import { ipv6Blocker } from "#middleware/ipv6Blocker";

export function expressApp() {
  // app (express)
  const app = express();
  ipv6Blocker(app); // IPv6 Blocker

  app.use(helmetConfig()); // helment helper
  app.use(express.json()); // json

  app.use(express.urlencoded({ extended: true })); // options
  // app.use("/", booksRouter); // book router
  booksRouter(app);

  app.listen(config.PORT, () => {
    console.log("Server connected, port: " + config.PORT);
  });
}
