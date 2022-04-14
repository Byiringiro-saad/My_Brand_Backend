import path from "path";
import fs from "fs";
import Blog from "../models/blogs.model.js";

export const createBlog = async (req, res) => {
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
        title: data.title,
        createdAt: Date.now(),
      });

      blog.save().then((response) => {
        return res.json({
          status: "success",
          message: "blog created",
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

export const blog = async (req, res) => {
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

export const blogs = async (req, res) => {
  try {
    await Blog.find({}).then((blogs) => {
      return res.json({
        status: "success",
        message: "all blogs",
        data: blogs,
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const data = {
    title: req.body.title,
    id: req.params.id,
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
        const filePath = path.join("./blogs", blog.file);

        fs.writeFile(filePath, file.data, { flag: "w" }, async (error) => {
          if (error) {
            throw new Error(error.message);
          } else {
            await Blog.findByIdAndUpdate(data.id, {
              title: data.title,
            }).then((response) => {
              return res.json({
                status: "success",
                message: "blog updated",
              });
            });
          }
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

export const deleteBlog = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Blog.findById(data.id).then(async (blog) => {
      const filePath = path.join("./blogs", blog.file);
      fs.unlink(filePath, async () => {
        await Blog.findByIdAndRemove(data.id).then(() => {
          return res.json({
            status: "success",
            message: "blog deleted",
          });
        });
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const likeBlog = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    await Blog.findById(data.id).then(async (blog) => {
      if (blog.likes.includes(req.user._id)) {
        await Blog.findByIdAndUpdate(data.id, {
          $pull: { likes: `${req.user._id}` },
        }).then(() => {
          return res.json({
            status: "success",
            message: "unliked",
          });
        });
      } else {
        await Blog.findByIdAndUpdate(data.id, {
          $push: { likes: `${req.user._id}` },
        }).then(() => {
          return res.json({
            status: "success",
            message: "liked",
          });
        });
      }
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const commentBlog = async (req, res) => {
  const data = {
    id: req.body.id,
    comment: req.body.comment,
  };

  try {
    await Blog.findByIdAndUpdate(data.id, {
      $push: {
        comments: {
          user: req.user._id,
          comment: data.comment,
          addedAt: Date.now(),
        },
      },
    }).then(() => {
      return res.json({
        status: "success",
        message: "comment added",
      });
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
};
