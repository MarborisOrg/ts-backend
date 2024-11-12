import { config } from "#config/env_get";
import loadAllRouter from "#routes/index";
import express from "express";
import swaggerDocs from "#config/swaggerDocs";

import "#init/index"; // init
import { helmetConfig } from "#config/helment";
// import { ipv6Blocker } from "#middleware/ipv6Blocker";

export function expressApp() {
  // app (express)
  const app = express();

  app.disable("x-powered-by"); // ?

  // ipv6Blocker(app); // IPv6 Blocker

  app.use(helmetConfig()); // helment helper
  app.use(express.json()); // json

  app.use(express.urlencoded({ extended: true })); // options
  // app.use("/", loadAllRouter); // book router
  loadAllRouter(app).then(function () {
    app.listen(config.PORT, () => {
      console.log("Server connected, port: " + config.PORT);

      swaggerDocs(app, config.PORT.toString());
    });
  });
}
