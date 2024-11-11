
import { blockIpMsg } from '#config/defaults';
import { Request, Response, NextFunction } from 'express';

const allowedIPs: string[] = ['127.0.0.1'/*, 'YOUR_ALLOWED_IP'*/];

const checkIP = (req: Request, res: Response, next: NextFunction): void => {
    const clientIP = req.ip;

    if (clientIP && allowedIPs.includes(clientIP)) {
        next();
    } else {
        res.status(403).send(blockIpMsg);
    }
};

export default checkIP;
