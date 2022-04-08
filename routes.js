const express = require("express");
const router = express.Router();

const upload = require("./services/image.service");

//controllers
const {
  createMessage,
  deleteMessage,
  message,
  messages,
  reply,
} = require("./controllers/messages.controllers");

const {
  createBlog,
  blog,
  blogs,
  deleteBlog,
  updateBlog,
} = require("./controllers/blogs.controllers");

const {
  createWork,
  work,
  works,
  updateWork,
  deleteWork,
} = require("./controllers/work.controllers");

//messages
router.get("/message", messages);
router.get("/message/:id", message);
router.post("/message/reply", reply);
router.post("/message/add", createMessage);
router.delete("/message/:id", deleteMessage);

//blogs
router.get("/blog", blogs);
router.get("/blog/:id", blog);
router.put("/blog/:id", updateBlog);
router.delete("/blog/:id", deleteBlog);
// router.post("/blog/create", upload.single("picture"), createBlog);
router.post("/blog/create", createBlog);

//works
router.get("/work", works);
router.get("/work/:id", work);
router.put("/work/:id", updateWork);
router.delete("/work/:id", deleteWork);
router.post("/work/create", upload.single("picture"), createWork);

module.exports = router;
