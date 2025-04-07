/**
 * All Routes related to A SINGLE COURSE
 */

const express = require("express");
const courseRouter = express.Router();

courseRouter.use(express.json());

// View a course
courseRouter.get("/preview", (req, res) => {
  // /api/v1/course/preview
  res.json("View a course");
});

// When user wants to Purchase a new course
courseRouter.post("/purchase", (req, res) => {
  // would expect payments here
  // /api/v1/course/purchase
  res.json("Purchase a course");
});

module.exports = { courseRouter: courseRouter };
