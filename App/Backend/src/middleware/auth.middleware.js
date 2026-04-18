import jwt from "jsonwebtoken"
import userModel from "../models/auth.model.js"

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        message: "unauthorised"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    });
  }
};
