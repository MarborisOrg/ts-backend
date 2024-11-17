import { config } from "#config/env_get";
import { signJWT } from "#modules/jwt/ref-acc-token";

export const loginController = (req: any, res: any) => {
  const { username, password } = req.body;

  if (username === config.admin_user && password === config.admin_pass) {
    return res.json(signJWT());
  }

  return res.status(401).json({ message: "Invalid credentials" });
};
