import { config } from "#config/env_get";
import loadAllRouter from "#routes/index";
import express from "express";
import swaggerDocs from "#config/swaggerDocs";
import { helmetConfig } from "#config/helment";

export function expressApp() {
  // app (express)
  const app = express();
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
  
      res.on('finish', () => {
          const duration = Date.now() - startTime;
          log.info({
              message: 'Response sent',
              statusCode: res.statusCode,
              duration: `${duration}ms`,
              timestamp: new Date().toISOString(),
          });
      });
  
      next();
  });

  app.disable("x-powered-by");
  // ipv6Blocker(app); // IPv6 Blocker
  app.use(helmetConfig()); // helment helper
  app.use(express.urlencoded({ extended: true })); // options

  loadAllRouter(app).then(function () {
    app.listen(config.PORT, () => {
      log.info('Server is running on port: '+ config.PORT);

      swaggerDocs(app, config.PORT.toString());
    });
  });
}
