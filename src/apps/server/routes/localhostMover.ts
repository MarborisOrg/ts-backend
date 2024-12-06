// express app (execution order)
// express settings

import { Express, NextFunction, Request, Response } from 'express';

export function localhostMover(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.hostname === 'localhost') {
      const newUrl = `https://127.0.0.1:${$.env.config.PORT}${req.originalUrl}`;
      return res.redirect(301, newUrl); // 301: Moved Permanently
    }
    next();
  });
}
