import { config } from "#config/env_get";
import loadAllRouter from "#routes/index";
import express, { Request, Response, NextFunction } from "express";
import swaggerDocs from "#config/swaggerDocs";
import { helmetConfig } from "#config/helment";
import cors from "cors";
import { timeoutMiddleware } from "#middleware/timeRace";
import { corsOptions } from "#config/cors";

export function expressApp() {
  // app (express)
  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());
  app.use((req, res, next) => {
    const startTime = Date.now();

    log.info({
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      timestamp: new Date().toISOString(),
    });

    res.on("finish", () => {
      const duration = Date.now() - startTime;
      log.info({
        message: "Response sent",
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    });

    next();
  });

  const responseSentMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.locals.responseSent = false;

    const originalSend = res.send.bind(res);
    res.send = (body: any): Response => {
      if (res.locals.responseSent) {
        return res;
      }
      res.locals.responseSent = true;
      return originalSend(body);
    };

    next();
  };

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
      console.log("SLEEP1");
    }, 7000);
    console.log("SLEEP2");
  });
}
