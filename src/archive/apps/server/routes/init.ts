// express app (execution order)
// express settings

import cors from 'cors';
import express, { Express } from 'express';

import { logMiddleware } from '#archive/apps/server/routes/apps/latest/middleware/log';
import { responseSentMiddleware } from '#archive/apps/server/routes/apps/latest/middleware/race/resSentRace';
import { timeoutMiddleware } from '#archive/apps/server/routes/apps/latest/middleware/race/timeRace';
import { corsOptions } from '#archive/apps/server/server.cors.config';
import { helmetConfig } from '#archive/apps/server/server.helmet.config';

export function initApp(app: Express): void {
  try {
    app.disable('x-powered-by');

    app.use(express.json());
    app.use(logMiddleware);
    app.use(responseSentMiddleware);
    // ipv6Blocker(app); // IPv6 Blocker
    app.use(helmetConfig()); // helmet helper
    app.use(express.urlencoded({ extended: true })); // options

    app.use(cors(corsOptions));
    app.use(timeoutMiddleware);
  } catch (_) {
    assert('error! loading not complete.');
  }
}
