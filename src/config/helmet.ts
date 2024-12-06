import helmet from 'helmet';

import { env_config } from '#config/env.service';

const helmetConfig = (): any => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", env_config.scriptSrc],
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
  });
};

export { helmetConfig };
