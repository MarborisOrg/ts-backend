import { blockIpMsg } from "#config/defaults";
import { config } from "#config/env_get";
import { Request, Response, NextFunction } from "express";

const checkIP = (req: Request, res: Response, next: NextFunction): void => {
  const clientIP = req.ip;

  if (clientIP && config.ALLOWED_IPS.includes(clientIP)) {
    next();
  } else {
    res.status(403).send(blockIpMsg);
  }
};

export { checkIP };
