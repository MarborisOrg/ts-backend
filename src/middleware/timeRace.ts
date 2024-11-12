import { Request, Response, NextFunction } from 'express';

export const timeoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timeout = 3000; // just 3s
    let responseSent = false; // Flag to track if response has been sent

    const timer = setTimeout(() => {
        if (!responseSent) {
            responseSent = true; // Mark response as sent
            res.status(503).send('Request timed out');
        }
    }, timeout);

    res.on('finish', () => {
        clearTimeout(timer);
    });

    // Override the res.send and res.json methods to set the flag
    const originalSend = res.send.bind(res);
    const originalJson = res.json.bind(res);

    res.send = function (...args: any[]) {
        responseSent = true; // Mark response as sent
        return originalSend(...args);
    };

    res.json = function (...args: any[]) {
        responseSent = true; // Mark response as sent
        return originalJson(...args);
    };

    next();
};