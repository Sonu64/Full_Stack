const express = require("express");
const adminRouter = express.Router();
const { AdminModel, CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { z } = require("zod");
const jwt = require("jsonwebtoken");

// Middlewares
adminRouter.use(express.json());
const { adminMiddleware } = require("../middlewares/admin");

// Sign-Up Admin
adminRouter.post("/signup", async (req, res) => {
  // /api/v1/admin/signup
  try {
    const requiredBody = z.object({
      email: z.string().min(6).max(100).email(),
      // The correct way is to first define it as a string and then apply .email()
      fullName: z.string().min(6).max(200),
      password: z.string().min(8).max(1000),
      //Detailed Password Validation Logic skipped here
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (parsedDataWithSuccess.success) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      await AdminModel.create({
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword,
      });
      res.status(200).json({
        message: `Successfully Signed Up ${req.body.fullName} as an Admin`,
      });

      return;
    } else {
      res.status(400).json({
        message: "Invalid Credentials !",
        error: parsedDataWithSuccess.error,
      });
      return;
    }
  } catch (err) {
    res.status(409).json({ error: "Admin with that E-Mail already exists !" });
    return;
  }
});

// Sign-In Admin
adminRouter.post("/signin", async (req, res) => {
  // /api/v1/admin/signin
  const givenEmail = req.body.email;
  const givenPassword = req.body.password;

  const foundAdmin = await AdminModel.findOne({ email: givenEmail });
  if (!foundAdmin) {
    res.status(400).json({ error: "Admin not found !" });
    return;
  } else {
    const passwordMatched = await bcrypt.compare(
      givenPassword,
      foundAdmin.password
    );
    if (!passwordMatched) {
      res.status(400).json({ error: "Wrong Admin Password !" });
      return;
    } else {
      const token = jwt.sign(
        {
          adminID: foundAdmin._id.toString(),
        },
        process.env.JWT_ADMIN_SECRET
      );
      res.status(200).json({ token: token });
    }
  }
});

// Create a course
adminRouter.post("/course", adminMiddleware, async (req, res) => {
  // /api/v1/admin/course
  const adminID = req.adminID;
  const adminData = await AdminModel.findOne({
    _id: adminID,
  });

  const requiredCourseBody = z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(100).max(10000), //////////////BUG?????????
    price: z.number().min(0).max(50000),
    imageURL: z.string().url(),
  });

  const parsedDataWithSuccess = requiredCourseBody.safeParse(req.body);
  if (parsedDataWithSuccess) {
    await CourseModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageURL: req.body.imageURL,
      creatorID: adminID,
    });
    res.status(200).json({
      message: `Successfully created course - '${req.body.title}' by ${adminData.fullName} !`,
    });
    return;
  } else {
    res.status(400).json({
      message: `Failed to create course by ${adminFullName} !`,
      error: parsedDataWithSuccess.error,
    });
    return;
  }
});

// Edit course content
adminRouter.put("/editCourse", adminMiddleware, async (req, res) => {
  // /api/v1/admin/editCourse
  const adminID = req.adminID;
  const courseData = await CourseModel.findOne({
    _id: req.body.courseID,
    creatorID: adminID,
  });
  if (courseData) {
    await CourseModel.updateOne(
      {
        _id: req.body.courseID,
        creatorID: adminID,
      },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          imageURL: req.body.imageURL,
        },
      }
    );
    res.status(200).json("Successfully Updated Course Details !");
    return;
  } else {
    res
      .status(503)
      .json({ Error: "You don't have Permission to Edit this Course !" });
    return;
  }
});

// Show all courses created by admin in bulk
adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminID = req.adminID;
  const allCourses = await CourseModel.find({
    creatorID: adminID,
  });
  res.status(200).json({ allCourses });
});

module.exports = { adminRouter: adminRouter };
