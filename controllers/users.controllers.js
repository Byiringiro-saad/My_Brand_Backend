import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Admin from "../models/user.model.js";

dotenv.config();

export const login = async (req, res) => {
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
                const token = jwt.sign(
                  { id: admin._id },
                  `${process.env.SIGN_SECRET}`
                );

                return res.json({
                  status: "success",
                  message: "admin logged in",
                  data: token,
                });
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

export const signup = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { error } = adminSignSchema.validate(data);

    if (error) {
      throw new Error(error.message);
    } else {
      bcrypt.hash(
        data.password,
        `${process.env.SALT}`,
        async (err, hashedPassword) => {
          if (err) {
            throw new Error(err.message);
          } else {
            const admin = new Admin({
              name: data.name,
              email: data.email,
              password: hashedPassword,
            });

            await admin.save().then(() => {
              return res.json({
                status: "success",
                message: "admin created",
              });
            });
          }
        }
      );
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

const adminSignSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});
