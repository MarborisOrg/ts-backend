import { Request, Response } from 'express';

import { signJWT } from '#app/server/routes/modules/jwt/ref-acc-token';
import { config } from '#config/env_get';

export const loginController = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username === config.admin_user && password === config.admin_pass) {
    res.json(signJWT());
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
