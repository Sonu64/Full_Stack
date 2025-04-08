const express = require("express");
const adminRouter = express.Router();
const AdminModel = require("../db");

adminRouter.use(express.json());

// Sign-Up Admin
adminRouter.post("/signup", (req, res) => {
  // /api/v1/admin/signup
  res.json("Admin Sign-Up endpoint");
});

// Sign-In Admin
adminRouter.post("/signin", (req, res) => {
  // /api/v1/admin/signin
  res.json("Admin Sign-In endpoint");
});

// Add a course
adminRouter.post("/course", (req, res) => {
  // /api/v1/admin/course
  res.json("Admin Course addition endpoint");
});

// Edit course content
adminRouter.put("/editCourse", (req, res) => {
  // /api/v1/admin/editCourse
  res.json("Admin Course Edit endpoint");
});

// Show all courses created by admin in bulk
adminRouter.get("/course/bulk", (req, res) => {
  res.json("All courses created by admin");
});

module.exports = { adminRouter: adminRouter };
