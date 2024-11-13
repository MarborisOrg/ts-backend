import { config } from "#config/env_get";
import loadAllRouter from "#routes/index";
import express, { Request, Response } from "express";
import swaggerDocs from "#config/swaggerDocs";
import { initApp } from "#app-ex-ord";

export function expressApp() {
  // app (express)
  const app = express();

  initApp(app)
    .then(function () {
      loadAllRouter(app)
        .then(function () {
          app.listen(config.PORT, () => {
            log.info("Server is running on port: " + config.PORT);

            swaggerDocs(app, config.PORT.toString());
          });
        })
        .catch(function () {
          log.error("unknown error when init app");
          die();
        });
    })
    .catch(function () {
      log.error("unknown error when init app");
      die();
    });

  app.get("/test/sleep", (req: Request, res: Response) => {
    // time out is 3 in all routers
    // but this codes run in background as well
    setTimeout(() => {
      res.json({ message: "Data retrieved successfully!" });
      log.info("SLEEP1");
      die();
    }, 5000);
    log.info("SLEEP2");
  });
}
