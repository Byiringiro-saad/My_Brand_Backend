import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.model.js";

dotenv.config();

export const login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const { error } = LoginSchema.validate(data);

    if (error) {
      throw new Error(error.message);
    } else {
      User.findOne({ email: data.email }).then(async (user) => {
        if (!user) {
          throw new Error("invalid email or password!");
        } else {
          await bcrypt
            .compare(data.password, user.password)
            .then((response) => {
              if (!response) {
                throw new Error("invalid email or password!");
              } else {
                const token = jwt.sign(
                  { id: user._id },
                  `${process.env.SIGN_SECRET}`
                );

                return res.json({
                  status: "success",
                  message: "user logged in",
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
    role: req.body.role,
  };

  try {
    const { error } = SignSchema.validate(data);

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
            const user = new User({
              name: data.name,
              email: data.email,
              role: data.role,
              password: hashedPassword,
            });

            await user.save().then(() => {
              return res.json({
                status: "success",
                message: "user created",
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

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});

const SignSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});
