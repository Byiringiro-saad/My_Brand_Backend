const Joi = require("joi");

const Message = require("../models/messages.model");
const sendMessage = require("../services/message.service");

exports.createMessage = async (req, res) => {
  const data = {
    names: req.body.names,
    email: req.body.email,
    message: req.body.message,
  };

  try {
    const { error } = messageSchema.validate(data);

    if (error) {
      throw new Error(error.message);
    } else {
      const message = new Message({
        sender: data.names,
        email: data.email,
        message: data.message,
        createAt: Date.now(),
      });

      await message.save().catch((error) => {
        throw new Error(error.message);
      });

      return res.json({
        status: "success",
        message: "message sent",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Message.findByIdAndRemove(data.id).catch((error) => {
      throw new Error(error.message);
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.message = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Message.findById(data.id)
      .then((message) => {
        return res.json({
          status: "success",
          message: "message",
          data: message,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.reply = async (req, res) => {
  const data = {
    reply: req.body.reply,
    messageId: req.body.messageId,
  };

  try {
    await Message.findById(data.messageId)
      .then(async (message) => {
        await sendMessage(message.email, data.reply)
          .then(async (response) => {
            await Message.findByIdAndUpdate(data.messageId, {
              replied: true,
            }).catch((error) => {
              throw new Error(error.message);
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.messages = async (req, res) => {
  try {
    await Message.find({})
      .then((response) => {
        return res.json({
          status: "success",
          message: "all messages",
          data: response,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

const messageSchema = Joi.object({
  names: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(3).max(300).required(),
});
