import { NextFunction, Request, Response } from 'express';

export const responseSentMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send.bind(res);
  const originalJson = res.json.bind(res);

  res.send = function (...args: readonly any[]): Response {
    if (!res.headersSent) {
      return originalSend(...args);
    } else {
      log.warn('Attempted to send response after headers were sent.');
      return res;
    }
  };

  res.json = function (...args: readonly any[]): Response {
    if (!res.headersSent) {
      return originalJson(...args);
    } else {
      log.warn('Attempted to send JSON response after headers were sent.');
      return res;
    }
  };

  next();
};
