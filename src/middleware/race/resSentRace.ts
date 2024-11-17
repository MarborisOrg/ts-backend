import { Request, Response, NextFunction } from "express";

export const responseSentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalSend = res.send.bind(res);
  const originalJson = res.json.bind(res);

  res.send = function (...args: any[]): Response {
    if (!res.headersSent) {
      return originalSend(...args);
    } else {
      console.warn("Attempted to send response after headers were sent.");
      return res;
    }
  };

  res.json = function (...args: any[]): Response {
    if (!res.headersSent) {
      return originalJson(...args);
    } else {
      console.warn("Attempted to send JSON response after headers were sent.");
      return res;
    }
  };

  next();
};
