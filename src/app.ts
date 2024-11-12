import { config } from "#config/env_get";
import loadAllRouter from "#routes/index";
import express, { Request, Response, NextFunction } from "express";
import swaggerDocs from "#config/swaggerDocs";
import { helmetConfig } from "#config/helment";
import cors from "cors";
import { timeoutMiddleware } from "#middleware/timeRace";
import { corsOptions } from "#config/cors";
import { responseSentMiddleware } from "#middleware/resSentRace";
import { logMiddleware } from "#middleware/log";

export function expressApp() {
  // app (express)
  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());
  app.use(logMiddleware);

  app.use(responseSentMiddleware);

  // ipv6Blocker(app); // IPv6 Blocker
  app.use(helmetConfig()); // helment helper
  app.use(express.urlencoded({ extended: true })); // options

  app.use(cors(corsOptions));
  app.use(timeoutMiddleware);

  loadAllRouter(app).then(function () {
    app.listen(config.PORT, () => {
      log.info("Server is running on port: " + config.PORT);

      swaggerDocs(app, config.PORT.toString());
    });
  });

  app.get("/test/sleep", (req: Request, res: Response) => {
    setTimeout(() => {
      res.json({ message: "Data retrieved successfully!" });
      log.info("SLEEP1");
      die();
    }, 5000);
    log.info("SLEEP2");
  });
}
