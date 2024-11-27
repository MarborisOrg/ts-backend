import { NextFunction, Request, Response } from 'express';

export const timeoutMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timeout = 3000; // just 3s

  const timer = setTimeout(() => {
    res.status(503).send('Request timed out!');
  }, timeout);

  res.on('finish', () => {
    clearTimeout(timer);
  });

  next();
};
