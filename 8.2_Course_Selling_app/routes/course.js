/**
 * All Routes related to A SINGLE COURSE
 */
const express = require("express");
const courseRouter = express.Router();
const { CourseModel, UserModel, PurchasesModel } = require("../db");

courseRouter.use(express.json());
const { userMiddleware } = require("../middlewares/user");

// View a course
courseRouter.get("/preview", async (req, res) => {
  // /api/v1/course/preview
  const courseData = await CourseModel.findOne({
    _id: req.body.courseID,
  });

  try {
    if (courseData) {
      res.status(200).json(courseData);
      return;
    } else {
      res.status(404).json({ Error: "No course found !" });
      return;
    }
  } catch (err) {
    res.status(500).json("Internal Server Error");
    return;
  }
});

// When user wants to Purchase a new course
courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  // DUMMY PAYMENT STATUS VARIABLE
  let paymentStatus = true;
  const courseData = await CourseModel.findOne({
    _id: req.body.courseID,
  });
  // /api/v1/course/purchase
  if (paymentStatus && courseData) {
    const customerDetails = await UserModel.findById(req.userID);
    await PurchasesModel.create({
      courseID: req.body.courseID,
      userID: req.userID,
    });

    res.status(200).json({
      courseName: courseData.title,
      purchasedBy: customerDetails.fullName,
    });

    return;
  } else {
    res
      .status(503)
      .send("Course Unavailable or Payment Status not confirmed !");
    return;
  }
});

module.exports = { courseRouter: courseRouter };
