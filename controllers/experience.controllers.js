import Experience from "../models/experience.model.js";

exports.createExperience = async (req, res) => {
  const data = {
    company: req.body.company,
    role: req.body.role,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    current: req.body.current,
    content: req.body.content,
  };

  try {
    const experience = new Experience({
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate,
      current: data.current,
      content: data.content,
      createdAt: Date.now(),
    });

    await experience.save().then(() => {
      return res.json({
        status: "success",
        message: "experience created",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.experience = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    Experience.findById(data.id).then((experience) => {
      return res.json({
        status: "success",
        message: "experience",
        data: experience,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.experiences = async (req, res) => {
  try {
    Experience.find({}).then((experiences) => {
      return res.json({
        status: "success",
        message: "experiences",
        data: experiences,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateExperience = async (req, res) => {
  const data = {
    id: req.params.id,
    company: req.body.company,
    role: req.body.role,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    current: req.body.current,
    content: req.body.content,
  };

  try {
    await Experience.findByIdAndUpdate(data.id, {
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate,
      current: data.current,
      content: data.content,
    }).then(() => {
      return res.json({
        status: "success",
        message: "experience updated",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteExperience = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Experience.findByIdAndRemove(data.id).then(() => {
      return res.json({
        status: "success",
        message: "experience deleted",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
