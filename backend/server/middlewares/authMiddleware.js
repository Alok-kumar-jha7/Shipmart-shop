import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new ErrorHandler("No token provided", 401));

  const token = authHeader.split(" ")[1]; // Bearer <token>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return next(new ErrorHandler("Invalid or expired token", 403));

    req.user = decoded; 
    next();
  });
};
