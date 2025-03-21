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
mongoose.connect(process.env.MONGO_DB_DATABASE_URI);
const PORT = 3001;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fjdifu8sud90svh8sd#3";
const { UserModel, TodoModel } = require("./db.js");

// Middlewares
app.use(express.json());

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
    const token = jwt.sign(foundUser._id, JWT_SECRET);
    res.status(200).json({ token: token });
  }
});

app.post("/todo", (req, res) => {});

app.get("/todos", (req, res) => {});

app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT}.`);
});
