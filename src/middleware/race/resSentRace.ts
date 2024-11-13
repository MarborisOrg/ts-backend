import { Request, Response, NextFunction } from "express";
import { EventEmitter } from "events";

const responseSentEmitter = new EventEmitter();

export const responseSentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.responseSent = false;

  const originalSend = res.send.bind(res);

  const preventMultipleResponses = (originalMethod: Function) => {
    return function (...args: any[]) {
      if (res.locals.responseSent) {
        log.error(
          `Attempted to send response multiple times for request: ${req.method} ${req.url}`
        );
        return res;
      }
      res.locals.responseSent = true;
      responseSentEmitter.emit("responseSent", req); // Emit the event
      return originalMethod(...args);
    };
  };

  res.send = preventMultipleResponses(originalSend);

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
