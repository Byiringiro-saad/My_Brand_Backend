const express = require("express");
const router = express.Router();
const adminAuth = require("./middlewares/admin.auth");

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

const {
  createAbout,
  about,
  updateAbout,
  updateImage,
} = require("./controllers/about.controllers");

//messages
router.get("/message", adminAuth, messages);
router.get("/message/:id", adminAuth, message);
router.post("/message/reply", adminAuth, reply);
router.post("/message/add", adminAuth, createMessage);
router.delete("/message/:id", adminAuth, deleteMessage);

//blogs
router.get("/blog", blogs);
router.get("/blog/:id", blog);
router.put("/blog/:id", adminAuth, updateBlog);
router.delete("/blog/:id", adminAuth, deleteBlog);
router.post("/blog/create", adminAuth, upload.single("picture"), createBlog);

//works
router.get("/work", works);
router.get("/work/:id", adminAuth, work);
router.put("/work/:id", adminAuth, updateWork);
router.delete("/work/:id", adminAuth, deleteWork);
router.post("/work/create", adminAuth, upload.single("picture"), createWork);

//experiences
router.get("/experience", experiences);
router.get("/experience/:id", adminAuth, experience);
router.put("/experience/:id", adminAuth, updateExperience);
router.delete("/experience/:id", adminAuth, deleteExperience);
router.post("/experience/create", adminAuth, createExperience);

//skills
router.get("/skill", skills);
router.put("/skill/:id", adminAuth, updateSkill);
router.delete("/skill:id", adminAuth, deleteSkill);
router.post("/skill/create", adminAuth, createSkill);

//about
router.get("/about", about);
router.post("/about", adminAuth, createAbout);
router.put("/about/image/:id", adminAuth, updateImage);
router.put("/about/content/:id", adminAuth, updateAbout);

module.exports = router;
