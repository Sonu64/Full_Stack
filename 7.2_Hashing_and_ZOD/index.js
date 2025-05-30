const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Connecting to Remote MongoDB Database, Models are only for creating data in a particular model,
// for putting those models to a collection we need to connect to remote DB,
// Syntax to connect to a Database inside a cluster: <clusterConnectionString/DatabaseName>
// Some ORMs (like Mongoose) automatically lowercase collection names unless specified.
// MongoDB collection names are case-insensitive on Windows and macOS (default Mac filesystem)
// BEST PRACTICE --> Use all Lowercase to avoid cross-platform inconsistencies
const connectToDB = async () => {
  await mongoose.connect(process.env.MONGO_DB_DATABASE_URI);
};
connectToDB();

const PORT = 3001;
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { UserModel, TodoModel } = require("./db.js");
const { z } = require("zod");

// Middlewares
app.use(express.json());
// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization; // Authorization not work
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.userId; // Add an userId to req object.
    next();
  } else {
    res.status(403).json({ message: "Invalid Token !" });
  }
};

app.post("/signup", async (req, res) => {
  let isPasswordValidTillNow = undefined;

  // Checking the password if it contains at least 1 Uppercase, 1 Lowercase and 1 special char
  // Uppercase checking and Lowercase checking
  if (
    req.body.password === req.body.password.toUpperCase() ||
    req.body.password === req.body.password.toLowerCase()
  ) {
    isPasswordValidTillNow = false;
  } else isPasswordValidTillNow = true;

  // Checking for Special Chars
  if (isPasswordValidTillNow) {
    let specialChars = ["~", "@", "#", "$", "%", "^", "&", "*"];
    for (char of specialChars) {
      if (req.body.password.includes(char)) {
        isPasswordValidTillNow = true;
        break;
      } else isPasswordValidTillNow = false;
    }
  }

  // Checking for Numbers
  if (isPasswordValidTillNow) {
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (number of numbers) {
      if (req.body.password.includes(number)) {
        isPasswordValidTillNow = true;
        break;
      } else isPasswordValidTillNow = false;
    }
  }

  // Checking if all characters are numbers. Like 123456
  if (isPasswordValidTillNow) {
    let allNumbers = true;
    for (letter of req.body.password) {
      if (!"0123456789".includes(letter)) {
        // Strings are iterables in JS
        allNumbers = false;
        break;
      }
    }
    if (!allNumbers) isPasswordValidTillNow = true; // unnecessary but Logical
    else isPasswordValidTillNow = false;
  }

  // If no Password issue error was sent and returned
  if (!isPasswordValidTillNow) {
    res.status(400).json({
      error:
        "Password must contain at least 1 Uppercase, 1 Lowercase, 1 Digit and 1 Special character !",
    });
    return;
  } else {
    try {
      const requiredBody = z.object({
        username: z.string().min(5).max(40),
        email: z.string().min(6).max(100).email(),
        fullName: z.string().min(2).max(120),
        password: z.string().min(8),
      });

      const parsedDataWithSucess = requiredBody.safeParse(req.body);

      if (!parsedDataWithSucess.success) {
        res.status(400).json({
          message: "Invalid Credentials",
          error: parsedDataWithSucess.error,
        });
        return;
        /** Note on: 'ERROR: HEADERS ALREADY SENT'
         * return is important after every single response is sent, otherwise it makes the function
         * continue running. HTTP responses can only be sent once per request.
         * If one response is sent but the function still continues to run and encounters another response
         * in function body, this violates HTTP Rules and errors like "Headers Already Sent" occurs.
         * return immediately stops the function execution and ensuures that only
         * 1 response is sent Per Request.
         */
      }

      const username = req.body.username;
      const email = req.body.email;
      const fullName = req.body.fullName;
      const givenPassword = req.body.password;

      // Hashing Password via bcrypt.hash(), Technique 2 (auto-gen a salt and hash) and attaches
      // it to hashed password. We don't need to seperately store salt in the DB.
      // We are using a Promise based approach of .hash(), not Callbacks. So Async-Await necessary.
      const hashedPassword = await bcrypt.hash(givenPassword, saltRounds);
      // No need for await if saltRounds=0

      await UserModel.create({
        username: username,
        email: email,
        fullName: fullName,
        password: hashedPassword,
      });

      res.status(200).json({ message: "You are signed Up !" });
    } catch (error) {
      res
        .status(409)
        .json({ message: "Error ! User with that email already exists" });
    }
  }
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const givenPassword = req.body.password;

  // First find if the user exists or not, we can't yet compare the plainText password
  const foundUser = await UserModel.findOne({
    username: username,
  });

  // Under the hood bcrypt extracts the salt from DB (i.e: foundUser.password).
  const passwordMatched = await bcrypt.compare(
    givenPassword,
    foundUser.password
  );

  if (!foundUser || !passwordMatched) {
    res.status(403).json({ message: "Invalid Username or Password !" });
  } else {
    const token = jwt.sign(
      {
        userId: foundUser._id.toString(), // property name should be same as used in jwt.verify !!
      },
      JWT_SECRET
    );
    res.status(200).json({ token: token });
  }
});

// Authenticated Endpoints, need token here
// Create Todo
app.post("/todo", auth, async (req, res) => {
  // We have access to an authenticated user here, with his userId
  const userId = req.userId;

  // Adding a Todo
  await TodoModel.create({
    description: req.body.description,
    completed: req.body.completed,
    UserID: userId,
  });
  res.status(200).json({ message: "Todo created successfully for " + userId });
});

// Get Todos
app.get("/todos", auth, async (req, res) => {
  // We have access to an authenticated user here, with his userId
  const userId = req.userId;

  //Fetching full name just to get the full Name of User
  const foundUser = await UserModel.findOne({
    _id: userId,
  });

  if (!foundUser) {
    res.status(404).json({
      error: "User Not found !",
    });
  } else {
    const fullName = foundUser.fullName;

    // Fetching all Todos
    const allTodos = await TodoModel.find({
      UserID: userId,
    });

    res.status(200).json({
      "Full Name": fullName,
      "Todo List": allTodos,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT}.`);
});

/**
 *
 * BUG FIX FOR TYPEERROR: CONVERTING CIRCULAR STRUCTURE TO JSON
 * If we get a TypeError: Converting circular structure to JSON in something like
 * TodosModel.find({ UserID: req.userId }) it is because .find() returns a Mongoose Query object,
 * not an actual array of todos. The issue occurs when res.json() tries to stringify
 * this query object, which contains circular references FIX -> Use async-await
 * You need to await the .find() method so that it resolves to an array of todos
 * instead of a query object.
 *
 * */
