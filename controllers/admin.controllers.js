const Joi = require("joi");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin.model");

exports.login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { error } = adminLoginSchema.validate(data);

    if (error) {
      throw new Error(error.message);
    } else {
      Admin.findOne({ email: data.email }).then(async (admin) => {
        if (!admin) {
          throw new Error("invalid email or password!");
        } else {
          await bcrypt
            .compare(data.password, admin.password)
            .then((response) => {
              if (!response) {
                throw new Error("invalid email or password!");
              } else {
              }
            });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const adminLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});
