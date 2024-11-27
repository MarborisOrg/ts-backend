import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { refreshPass } from '#app/routes/config/config';
import { signJWT } from '#app/routes/modules/jwt/ref-acc-token';

export const tokenController = (req: Request, res: Response): void => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).json({ message: 'Refresh token is required' });
    return;
  }

  jwt.verify(refreshToken, refreshPass, (err: any, _decoded: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid refresh token' });
      return;
    }
    return res.json(signJWT());
  });
};
