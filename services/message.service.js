const nodemailer = require("nodemailer");

const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "sajuengine@gmail.com",
    pass: process.env.PASS,
  },
  secure: true,
});

const sendEmail = (email, reply) => {
  const maildata = {
    from: "sajuengine@gmail.com",
    to: `${email}`,
    subject: "Hello from Saad🪄.",
    html: `${reply}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(maildata, (err, info) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = sendEmail;
