const Work = require("../models/work.model");

exports.createWork = async (req, res) => {
  const data = {
    image: req.file.path,
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
    cards: req.body.cards,
  };

  try {
    const work = new Work({
      title: data.work,
      link: data.link,
      description: data.description,
      image: data.image,
      cards: data.cards,
      createdAt: Date.now(),
    });

    work.save().catch((error) => {
      throw new Error(error.message);
    });

    return res.json({
      status: "success",
      message: "work created",
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
    await Work.findById(data.id)
      .then(async (work) => {
        return res.json({
          status: "success",
          message: "work",
          data: work,
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

exports.works = async (req, res) => {
  try {
    await Work.find({})
      .then(async (works) => {
        return res.json({
          status: "success",
          message: "works",
          data: works,
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
    }).catch((error) => {
      throw new Error(error.message);
    });

    return res.json({
      status: "success",
      message: "work created",
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
    await Work.findByIdAndRemove(data.id).catch((error) => {
      throw new Error(error.message);
    });

    return res.json({
      status: "success",
      message: "work deleted",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
