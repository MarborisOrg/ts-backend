// express app (execution order)
// express settings

import express, { Express } from "express";
import { helmetConfig } from "#config/helment";
import cors from "cors";
import { timeoutMiddleware } from "#middleware/timeRace";
import { corsOptions } from "#config/cors";
import { responseSentMiddleware } from "#middleware/resSentRace";
import { logMiddleware } from "#middleware/log";

export async function initApp(app: Express): Promise<void> {
  try {
    app.disable("x-powered-by");

    app.use(express.json());
    app.use(logMiddleware);
  
    app.use(responseSentMiddleware);
  
    // ipv6Blocker(app); // IPv6 Blocker
    app.use(helmetConfig()); // helment helper
    app.use(express.urlencoded({ extended: true })); // options
  
    app.use(cors(corsOptions));
    app.use(timeoutMiddleware);
  } catch (error) {
    log.info("error! loading not complete.");
    quit()
  }
}