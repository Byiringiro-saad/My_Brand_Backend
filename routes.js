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

const {
  createExperience,
  experience,
  experiences,
  updateExperience,
  deleteExperience,
} = require("./controllers/experience.controllers");

const {
  createSkill,
  deleteSkill,
  skills,
  updateSkill,
} = require("./controllers/skills.controllers");

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
router.post("/blog/create", upload.single("picture"), createBlog);

//works
router.get("/work", works);
router.get("/work/:id", work);
router.put("/work/:id", updateWork);
router.delete("/work/:id", deleteWork);
router.post("/work/create", upload.single("picture"), createWork);

//experiences
router.get("/experience", experiences);
router.get("/experience/:id", experience);
router.put("/experience/:id", updateExperience);
router.delete("/experience/:id", deleteExperience);
router.post("/experience/create", createExperience);

//skills
router.get("/skill", skills);
router.put("/skill/:id", updateSkill);
router.delete("/skill:id", deleteSkill);
router.post("/skill/create", createSkill);

module.exports = router;
