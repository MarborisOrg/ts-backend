import { Request, Response, NextFunction, Express } from "express";

const blockIPv6 = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.ip || req.socket.remoteAddress;

  if (ip && ip.includes(":")) {
    res.status(403).send("Access denied: IPv6 addresses are not allowed.");
    return;
  }

  next();
};

export function ipv6Blocker(app: Express): void {
  app.use(blockIPv6);
}
