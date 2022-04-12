const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.auth) {
      throw new Error("not athorisation provided");
    } else {
      const { id } = jwt.decode(req.headers.auth);

      await Admin.findById(id).then((admin) => {
        if (!admin) {
          throw new Error("not authorised to this service");
        } else {
          next();
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
