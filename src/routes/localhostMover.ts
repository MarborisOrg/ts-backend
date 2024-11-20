// express app (execution order)
// express settings

import { Express, Request, Response } from 'express';

import { config } from '#config/env_get';

export async function localhostMover(app: Express): Promise<void> {
  app.use((req: Request, res: Response, next) => {
    if (req.hostname === 'localhost') {
      const newUrl = `https://127.0.0.1:${config.PORT}${req.originalUrl}`;
      return res.redirect(301, newUrl); // 301: Moved Permanently
    }
    next();
  });
}
