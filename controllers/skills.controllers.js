import Skill from "../models/skills.model.js";

exports.createSkill = async (req, res) => {
  const data = {
    title: req.body.title,
    banner: req.body.banner,
    skills: req.body.skills,
  };

  try {
    const skill = new Skill({
      title: data.title,
      banner: data.banner,
      skills: data.skills,
    });

    await skill.save().then(() => {
      return res.json({
        status: "success",
        message: "skill created",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.skills = async (req, res) => {
  try {
    await Skill.find({}).then((dara) => {
      return res.json({
        status: "success",
        message: "All skills",
        data: data,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateSkill = async (req, res) => {
  const data = {
    id: req.params.id,
    title: req.body.title,
    banner: req.body.banner,
    skills: req.body.skills,
  };

  try {
    await Skill.findByIdAndUpdate(data.id, {
      title: data.title,
      banner: data.banner,
      skills: data.skills,
    }).then(() => {
      return res.json({
        status: "success",
        message: "skill updated",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteSkill = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Skill.findByIdAndRemove(data.id).then(() => {
      return res.json({
        status: "success",
        message: "skill deleted",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
