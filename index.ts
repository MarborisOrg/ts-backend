
// by MRB

import express from "express";
import { config } from "./src/config/get";
import booksRouter from "./src/routes";

import "./src/init"; // init
import helmet from "helmet";

// app (express)
const app = express()

app.use(helmet({
  contentSecurityPolicy: {
      directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://forvest.io"],
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

app.use('/', booksRouter);

app.listen(config.PORT, () => {
  console.log("Server connected, port: " + config.PORT)
});
