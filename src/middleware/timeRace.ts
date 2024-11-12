import { Request, Response, NextFunction } from 'express';

export const timeoutMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const timeout = 3000; // just 3s

    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);
    });

    Promise.race([
        new Promise<void>((resolve) => {
            res.on('finish', resolve);
        }),
        timeoutPromise
    ])
    .then(() => {
        next();
    })
    .catch((err: Error) => {
        res.status(503).send(err.message);
    });
};
