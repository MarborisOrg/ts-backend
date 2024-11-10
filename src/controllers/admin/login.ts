import jwt from "jsonwebtoken";
import { config } from "#config/env_get";

export const loginController = (req: any, res: any) => {
  const { username, password } = req.body;

  if (username === config.admin_user && password === config.admin_pass) {
    const token = jwt.sign({ role: "admin" }, config.SECRET_KEY, {
      expiresIn: "30d",
    }); // 30 days
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
};
