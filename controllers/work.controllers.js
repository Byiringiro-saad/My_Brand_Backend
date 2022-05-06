const Work = require("../models/work.model.js");

exports.createWork = async (req, res) => {
  const data = {
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
    cards: req.body.cards,
  };

  // const response = await v2.uploader.upload(req?.files?.picture?.tempFilePath);

  try {
    const work = new Work({
      title: data.work,
      link: data.link,
      description: data.description,
      // image: response.secure_url,
      cards: data.cards,
      createdAt: Date.now(),
    });

    work.save().then(() => {
      return res.json({
        status: "success",
        message: "work created",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.work = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Work.findById(data.id).then(async (work) => {
      return res.json({
        status: "success",
        message: "work",
        data: work,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.works = async (req, res) => {
  try {
    await Work.find({}).then(async (works) => {
      return res.json({
        status: "success",
        message: "works",
        data: works,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateWork = async (req, res) => {
  const data = {
    id: req.params.id,
    image: req.file.path,
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
    cards: req.body.cards,
  };

  try {
    await Work.findByIdAndUpdate(data.id, {
      title: data.work,
      link: data.link,
      description: data.description,
      image: data.image,
      cards: data.cards,
    }).then(() => {
      return res.json({
        status: "success",
        message: "work created",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteWork = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Work.findByIdAndRemove(data.id).then(() => {
      return res.json({
        status: "success",
        message: "work deleted",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
