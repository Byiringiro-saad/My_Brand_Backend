import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async (req, res, next) => {
  try {
    if (!req.headers.auth) {
      throw new Error("no athorisation provided");
    } else {
      const { id } = jwt.decode(req.headers.auth);

      await User.findById(id).then((user) => {
        if (!user) {
          throw new Error("user not found");
        } else {
          if (user.role === "normal" || user.role === "admin") {
            req.user = user;
            next();
          } else {
            throw new Error("user not allowed to perform this operation");
          }
        }
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
