import { config } from "#config/env_get";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const tokenController = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token is required" });
      return
    }

    // بررسی اینکه refresh token معتبر است (مثلاً در دیتابیس)
    jwt.verify(refreshToken, config.SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ message: "Invalid refresh token" });
        return
      }

      const accessToken = jwt.sign({ role: "admin" }, config.SECRET_KEY, {
        expiresIn: "15m",
      });
      res.json({ accessToken });
      return
    });
};
