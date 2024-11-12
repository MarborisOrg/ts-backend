import jwt from "jsonwebtoken";
import { config } from "#config/env_get";

export const loginController = (req: any, res: any) => {
  const { username, password } = req.body;

  if (username === config.admin_user && password === config.admin_pass) {
    const accessToken = jwt.sign({ role: "admin", type: "access" }, config.SECRET_KEY, {
      expiresIn: "15m",
    });
    
    const refreshToken = jwt.sign({ role: "admin", type: "refresh" }, config.SECRET_KEY, {
      expiresIn: "30d",
    });    
    return res.json({ accessToken, refreshToken });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};
