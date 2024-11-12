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
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, 'log');
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
  app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
  });

  app.disable("x-powered-by");
  // ipv6Blocker(app); // IPv6 Blocker
  app.use(helmetConfig()); // helment helper
  app.use(express.json()); // json
  app.use(express.urlencoded({ extended: true })); // options

  loadAllRouter(app).then(function () {
    app.listen(config.PORT, () => {
      logger.info('Server is running on port: '+ config.PORT);

      swaggerDocs(app, config.PORT.toString());
    });
  });
}
