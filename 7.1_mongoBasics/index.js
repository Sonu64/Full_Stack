const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// Connecting to Remote MongoDB Database, Models are onlly for creating data in a particular model,
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
const JWT_SECRET = "fjdifu8sud90svh8sd#3";
const { UserModel, TodoModel } = require("./db.js");

// Middlewares
app.use(express.json());
// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization; // Authorization not work
  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.userId;
    next();
  } else {
    res.status(403).json({ message: "Invalid Token !" });
  }
};

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;

  await UserModel.create({
    username: username,
    email: email,
    fullName: fullName,
    password: password,
  });

  res.status(200).json({ message: "You are signed Up !" });
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = await UserModel.findOne({
    username: username,
    password: password,
  });

  if (!foundUser) {
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
app.get("/todos", auth, (req, res) => {
  // We have access to an authenticated user here, with his userId
  const userId = req.userId;

  // Fetching full name just to get the full Name of User
  // const foundUser = UserModel.findOne({
  //   _id: userId,
  // });
  // const fullName = foundUser.fullName;
  // console.log(fullName);

  const allTodos = TodoModel.find({
    UserID: userId,
  });

  res.status(200).json({
    allTodos,
  });
});

app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT}.`);
});
