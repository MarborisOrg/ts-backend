import { Request, Response, NextFunction } from "express";
import { EventEmitter } from "events";

const responseSentEmitter = new EventEmitter();

export const responseSentMiddleware2 = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.responseSent = false;

  const originalSend = res.send.bind(res);
  res.send = (body: any): Response => {
    if (res.locals.responseSent) {
      return res;
    }
    res.locals.responseSent = true;
    return originalSend(body);
  };

  next();
};

export const responseSentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.locals.responseSent = false;

  const originalSend = res.send.bind(res);
  //   const originalJson = res.json.bind(res);
  //   const originalEnd = res.end.bind(res);
  //   const originalRedirect = res.redirect.bind(res);

  const preventMultipleResponses = (originalMethod: Function) => {
    return function (...args: any[]) {
      if (res.locals.responseSent) {
        log.warn(
          `Attempted to send response multiple times for request: ${req.method} ${req.url}`,
        );
        return res;
      }
      res.locals.responseSent = true;
      responseSentEmitter.emit("responseSent", req); // Emit the event
      return originalMethod(...args);
    };
  };

  res.send = preventMultipleResponses(originalSend);
  //   res.json = preventMultipleResponses(originalJson);
  //   res.end = preventMultipleResponses(originalEnd);
  //   res.redirect = preventMultipleResponses(originalRedirect);

  // Listen for the responseSent event only once
  responseSentEmitter.once("responseSent", (request) => {
    log.info(`Response sent for request: ${request.method} ${request.url}`);
  });

  // Error handling
  res.on("finish", () => {
    if (!res.locals.responseSent) {
      log.error(`Response not sent for request: ${req.method} ${req.url}`);
    }
  });

  next();
};
