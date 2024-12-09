import { Request, Response } from 'express';

import { signJWT } from '#archive/apps/server/routes/modules/jwt/ref-acc-token';

export const loginController = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (
    username === $.env.config.admin_user &&
    password === $.env.config.admin_pass
  ) {
    res.json(signJWT());
  }

  res.status(401).json({ message: 'Invalid credentials' });
};
