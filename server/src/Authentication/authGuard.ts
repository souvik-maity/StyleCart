import jwt from "jsonwebtoken";
import { SecretKeys } from "../constants/environment";
import { HTTPStatusCodes } from "../constants/constants";

const authGuard = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(HTTPStatusCodes.UNAUTHORIZED)
      .json({ message: "Access token missing" });
  }
  try {
    const decoded = jwt.verify(token, SecretKeys.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(HTTPStatusCodes.FORBIDDEN)
      .json({ message: "Invalid or expired token" });
  }
};

module.exports = authGuard;
