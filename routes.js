import express from "express";
import adminAuth from "./middlewares/admin.auth.js";

import upload from "./services/image.service.js";

const router = express.Router();

//controllers
import {
  createMessage,
  deleteMessage,
  message,
  messages,
  reply,
} from "./controllers/messages.controllers.js";

import {
  createBlog,
  blog,
  blogs,
  deleteBlog,
  updateBlog,
} from "./controllers/blogs.controllers.js";

import {
  createWork,
  work,
  works,
  updateWork,
  deleteWork,
} from "./controllers/work.controllers.js";

import {
  createExperience,
  experience,
  experiences,
  updateExperience,
  deleteExperience,
} from "./controllers/experience.controllers.js";

import {
  createSkill,
  deleteSkill,
  skills,
  updateSkill,
} from "./controllers/skills.controllers.js";

import {
  createAbout,
  about,
  updateAbout,
  updateImage,
} from "./controllers/about.controllers.js";

import { login, signup } from "./controllers/users.controllers.js";

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

//user
router.get("/user/login", login);
router.get("/user/signup", signup);

export default router;
