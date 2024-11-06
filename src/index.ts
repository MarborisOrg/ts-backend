
// by MRB

import express from "express";
import { config } from "./config/env_get.js";
import booksRouter from "./routes/index.js";

import "./init"; // init
import helmet from "helmet";

// app (express)
const app = express()

app.use(helmet({
  contentSecurityPolicy: {
      directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", config.scriptSrc],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
      },
  },
  hidePoweredBy: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
  },
  referrerPolicy: { policy: 'no-referrer' },
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/', booksRouter);

app.listen(config.PORT, () => {
  console.log("Server connected, port: " + config.PORT)
});
