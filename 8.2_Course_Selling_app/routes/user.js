/**
 * All Routes related to USER
 */

const express = require("express");
const userRouter = express.Router();

// Middlewares
userRouter.use(express.json());

// Sign-Up User
userRouter.post("/signup", (req, res) => {
  // /api/v1/user/signup
  res.json("Sign-Up endpoint");
});

// Sign-In User
userRouter.post("/signin", (req, res) => {
  // /api/v1/user/signin
  res.json("Sign-In endpoint");
});

// When user wants to see his purchased courses
userRouter.get("/purchases", (req, res) => {
  // /api/v1/user/purchases
  res.json("All Purchased Courses");
});

module.exports = { userRouter: userRouter };
