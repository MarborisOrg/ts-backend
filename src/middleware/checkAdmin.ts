// middleware/checkAdmin.js
import jwt from "jsonwebtoken";
import { accessPass } from "#modules/jwt/config";

const checkAdmin = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  jwt.verify(token, accessPass, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    if (decoded.type !== "access") {
      return res.status(403).json({ message: "Invalid token type" });
    }

    if (decoded.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  });
};

export default checkAdmin;
