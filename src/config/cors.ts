import { CorsOptions } from 'cors';

import { config } from './env_get.js';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.ALLOWED_IPS.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
      // callback(new Error('Not Allowed'), false);
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Custom-Header'],
  credentials: true,
  maxAge: 3600, // 1 hour
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
