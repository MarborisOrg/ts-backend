import { accessPass, refreshPass } from "#modules/jwt/config";
import { signJWT } from "#modules/jwt/ref-acc-token";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const tokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token is required" });
    return;
  }

  jwt.verify(refreshToken, refreshPass, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }
    return res.json(signJWT());
  });
};
