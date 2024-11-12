import { config } from "./env_get.js";

export const corsOptions = {
    origin: config.ALLOWED_IPS, // or other settings TODO()
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Custom-Header'],
    credentials: true,
    maxAge: 3600, // 1 hour
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };