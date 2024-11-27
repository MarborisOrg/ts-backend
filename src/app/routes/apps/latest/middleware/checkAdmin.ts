// middleware/checkAdmin.js
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { accessPass } from '#app/routes/config/config';

const checkAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1] || '';

  if (!token) {
    res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, accessPass, (err: any, decoded: any): void => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
    }

    if (decoded.type !== 'access') {
      res.status(403).json({ message: 'Invalid token type' });
    }

    if (decoded.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  });
};

export default checkAdmin;
