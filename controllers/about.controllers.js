const fs = require("fs");
const About = require("../models/about.model");

exports.createAbout = async (req, res) => {
  const data = {
    image: req.file.path,
  };

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let file = req.files.about;
      file.mv(path.join("./about", file.name));

      const about = new About({
        file: file.name,
        image: data.image,
      });

      about.save().then((response) => {
        return res.json({
          status: "success",
          message: "about created",
        });
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.about = async (req, res) => {
  try {
    await About.find({}).then((abouts) => {
      const filename = abouts[0].file;
      const relPath = path.join("./about", filename);

      fs.readFile(relPath, "utf8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          return res.json({
            status: "success",
            message: "about content",
            data: {
              image: abouts[0].image,
              content: data,
            },
          });
        }
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateAbout = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await About.findById(data.id).then((about) => {
      const file = req.files.about;
      const filePath = path.join("./about", about.file);

      fs.writeFile(filePath, file.data, { flag: "w" }, async (error) => {
        if (error) {
          throw new Error(error.message);
        } else {
          return res.json({
            status: "success",
            message: "about updated",
          });
        }
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateImage = async (req, res) => {
  const data = {
    id: req.params.id,
    image: req.file.path,
  };

  try {
    await About.findByIdAndUpdate(data.id, {
      image: data.image,
    }).then(() => {
      return res.json({
        status: "success",
        message: "about updated",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
