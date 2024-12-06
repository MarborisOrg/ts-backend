import { Request, Response } from 'express';

import { signJWT } from '#app/server/routes/modules/jwt/ref-acc-token';
import { env_config } from '#config/env.service';

export const loginController = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (
    username === env_config.admin_user &&
    password === env_config.admin_pass
  ) {
    res.json(signJWT());
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
