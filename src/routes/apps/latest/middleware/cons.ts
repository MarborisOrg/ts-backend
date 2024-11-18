import { NextFunction, Request, Response } from 'express';

import { blockIpMsg } from '#config/defaults';
import { config } from '#config/env_get';

const checkIP = (req: Request, res: Response, next: NextFunction): void => {
  const clientIP = req.ip;

  if (clientIP && config.ALLOWED_IPS.includes(clientIP)) {
    next();
  } else {
    const ip = req.headers['x-forwarded-for']
      ? Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0]
        : req.headers['x-forwarded-for']
      : req.socket.remoteAddress;

    if (!ip) {
      res.status(403).send(blockIpMsg);
      return;
    }

    const clientIP = ip.includes(':') ? ip.split(':').pop() : ip;

    if (clientIP && config.ALLOWED_IPS.includes(clientIP)) {
      next();
    } else {
      res.status(403).send(blockIpMsg);
    }
  }
};

export { checkIP };
