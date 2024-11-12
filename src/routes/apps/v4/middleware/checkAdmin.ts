// middleware/checkAdmin.js
import jwt from "jsonwebtoken";
import { config } from "#config/env_get";

const checkAdmin = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, config.SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (decoded.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  });
};

export default checkAdmin;