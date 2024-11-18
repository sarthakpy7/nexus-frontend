import jwt from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";
import { errorHandler } from "./error.js";

dotenvConfig();

export const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "5h" });
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "Token missing"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized user"));
    }
    req.user = decoded;
    next();
  });
};
