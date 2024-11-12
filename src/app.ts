import { config } from "#config/env_get";
import loadAllRouter from "#routes/index";
import express from "express";
import swaggerDocs from "#config/swaggerDocs";
import { helmetConfig } from "#config/helment";
import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // این برای بدست اوردن مسیر فولدر های دیگه مثل بیلد یا دیست هست

const logDir = path.join('log'); // or __dirname
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

export function expressApp() {
  // app (express)
  const app = express();
  app.use(express.json());
  app.use((req, res, next) => {
      const startTime = Date.now();
  
      logger.info({
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
          logger.info({
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
      logger.info('Server is running on port: '+ config.PORT);

      swaggerDocs(app, config.PORT.toString());
    });
  });
}
