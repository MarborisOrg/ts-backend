import { Request, Response } from 'express';
import open from 'open';

import { whereIsHere } from '#app.where';
import loadAllRouter from '#apps/server/routes/index';
import { initApp } from '#apps/server/routes/init';
import { localhostMover } from '#apps/server/routes/localhostMover';
import swaggerDocs from '#apps/server/server.swagger';

export default function (): void {
  // app (express)
  const app = $.express();

  localhostMover(app);

  app.use($.express.static(whereIsHere('public')));
  app.get('/', (_req: Request, res: Response) => {
    res.sendFile($.path.join(whereIsHere('public'), 'index.html'));
  });

  try {
    initApp(app);
  } catch (_) {
    log.error('unknown error when init app');
    die();
  } finally {
    loadAllRouter(app)
      .then(function () {
        function inlineApp(https: boolean): void {
          echo('Info: Server is running on port: ' + $.env.config.PORT);

          if ($.config.dev) {
            swaggerDocs(app, $.env.config.PORT.toString());
            if ($.config.debug) {
              void open(
                `${https ? 'https' : 'http'}://127.0.0.1:${$.env.config.PORT}/docs`
              );
            }
          }
        }
        if ($.config.https) {
          const options = {
            key: $.fs.readFileSync('keys/private.key'),
            cert: $.fs.readFileSync('keys/certificate.crt'),
          };
          $.https.createServer(options, app).listen($.env.config.PORT, () => {
            inlineApp(true);
          });
        } else {
          app.listen($.env.config.PORT, () => {
            inlineApp(false);
          });
        }
      })
      .catch(function () {
        log.error('unknown error when init app');
        die();
      });
  }

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
