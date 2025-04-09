/**
 * All Routes related to USER
 */
const express = require("express");
const userRouter = express.Router();
const { UserModel, PurchasesModel } = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { z } = require("zod");
const jwt = require("jsonwebtoken");

// Middlewares
userRouter.use(express.json());

// Sign-Up User
userRouter.post("/signup", async (req, res) => {
  // /api/v1/user/signup
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
      await UserModel.create({
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword,
      });
      res.status(200).json({ message: "Successfully Signed Up !" });

      return;
    } else {
      res.status(400).json({
        message: "Invalid Credentials !",
        error: parsedDataWithSuccess.error,
      });
      return;
    }
  } catch (err) {
    res.status(409).json({ error: "User with that E-Mail already exists !" });
    return;
  }
});

// Sign-In User
userRouter.post("/signin", async (req, res) => {
  // /api/v1/user/signin
  const givenEmail = req.body.email;
  const givenPassword = req.body.password;

  const foundUser = await UserModel.findOne({ email: givenEmail });
  if (!foundUser) {
    res.status(400).json({ error: "User not found !" });
    return;
  } else {
    const passwordMatched = await bcrypt.compare(
      givenPassword,
      foundUser.password
    );
    if (!passwordMatched) {
      res.status(400).json({ error: "Wrong Password !" });
      return;
    } else {
      const token = jwt.sign(
        {
          userID: foundUser._id.toString(),
        },
        process.env.JWT_USER_SECRET
      );
      res.status(200).json({ token: token });
    }
  }
});

// When user wants to see his purchased courses
userRouter.get("/purchases", (req, res) => {
  // /api/v1/user/purchases
  res.json("All Purchased Courses");
});

module.exports = { userRouter: userRouter };
