import fs from 'fs';
import https from 'https';

import express, { Request, Response } from 'express';

import { config } from '#config/env_get';
import swaggerDocs from '#config/swaggerDocs';
import { initApp } from '#core/app-ex-ord';
import loadAllRouter from '#routes/index';

const options = {
  key: fs.readFileSync('keys/private.key'),
  cert: fs.readFileSync('keys/certificate.crt'),
};

export function expressApp() {
  // app (express)
  const app = express();

  app.use((req: Request, res: Response, next) => {
    if (req.hostname === 'localhost') {
      const newUrl = `http://127.0.0.1:${config.PORT}${req.originalUrl}`;
      return res.redirect(301, newUrl); // 301: Moved Permanently
    }
    next();
  });

  initApp(app)
    .then(function () {
      loadAllRouter(app)
        .then(function () {
          https.createServer(options, app).listen(config.PORT, () => { // app.listen(config.PORT
            log.info('Server is running on port: ' + config.PORT);

            swaggerDocs(app, config.PORT.toString());
          });
        })
        .catch(function () {
          log.error('unknown error when init app');
          die();
        });
    })
    .catch(function () {
      log.error('unknown error when init app');
      die();
    });

  app.get('/test/sleep', (_req: Request, res: Response) => {
    // time out is 3 in all routers
    // but this codes run in background as well
    setTimeout(() => {
      res.json({ message: 'Data retrieved successfully!' });
      log.info('SLEEP1');
      quit();
    }, 5000);
    log.info('SLEEP2');
  });
}
