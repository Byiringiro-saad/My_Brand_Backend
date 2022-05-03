import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new Error("no athorisation provided");
    } else {
      const auth = req.headers["authorization"].split(" ");
      const { id } = jwt.decode(auth[1]);

      await User.findById(id).then((user) => {
        if (!user) {
          throw new Error("admin not found");
        } else {
          if (user.role === "admin") {
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
