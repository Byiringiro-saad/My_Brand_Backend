const path = require("path");
const fs = require("fs");
const Blog = require("../models/blogs.model");

exports.createBlog = async (req, res) => {
  const data = {
    image: req.file.path,
    title: req.body.title,
  };

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let file = req.files.blog;
      file.mv(path.join("./blogs", file.name));

      const blog = new Blog({
        file: file.name,
        image: data.image,
        title: data.image,
        createdAt: Date.now(),
      });

      blog.save().catch((error) => {
        throw new Error(error.message);
      });
    }

    return res.json({
      status: "success",
      message: "blog created",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.blog = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Blog.findById(data.id).then(async (blog) => {
      const filename = blog.file;
      const relPath = path.join("./blogs", filename);

      return res.download(relPath);
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.blogs = async (req, res) => {
  try {
    await Blog.find({})
      .then((blogs) => {
        return res.json({
          status: "success",
          message: "all blogs",
          data: blogs,
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

exports.updateBlog = async (req, res) => {
  const data = {
    image: req.file.path,
    title: req.body.title,
    id: req.params.blog,
  };

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      await Blog.findById(data.id).then(async (blog) => {
        const file = req.files.blog;
        let content = fs.readFileSync(file);
        const filePath = path.join("./blogs", blog.file);

        fs.writeFileSync(
          filePath,
          content.toString(),
          { flag: "w" },
          async (error) => {
            if (error) {
              throw new Error(error.message);
            } else {
              await Blog.findByIdAndUpdate(data.id, {
                image: data.image,
                title: data.image,
              })
                .then((response) => {
                  return res.json({
                    status: "success",
                    message: "blog updated",
                  });
                })
                .catch((error) => {
                  throw new Error(error.message);
                });
            }
          }
        );
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Blog.findById(data.id)
      .then(async (blog) => {
        const filePath = path.join("./blogs", blog.file);
        fs.unlink(filePath, async () => {
          await Blog.findByIdAndRemove(data.id).catch((error) => {
            throw new Error(error.message);
          });
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    return res.json({
      status: "success",
      message: "blog deleted",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
