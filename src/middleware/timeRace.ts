import { Request, Response, NextFunction } from "express";

export const timeoutMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timeout = 3000; // just 3s

  const timer = setTimeout(() => {
    res.status(503).send("Request timed out!");
  }, timeout);

  res.on("finish", () => {
    clearTimeout(timer);
  });

  next();
};
