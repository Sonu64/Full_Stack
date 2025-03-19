const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 3001;
const users = [];
const cors = require("cors");
const JWT_SECRET = "nfsd89f7sdnsd89cn98dss";

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.220.1:3000"],
  })
);

// Authorization Middleware that verifies req.username
const auth = (req, res, next) => {
  const token = req.headers.Authorization;
  if (token) {
    // directly calling jwt.verify() using a slightly better approach, with a callback included
    jwt.verify(token, JWT_SECRET, (err, userDetails) => {
      if (err) res.status(401).json({ Error: "Unauthorized" });
      else {
        // We are only adding the req.username to a verified username, so that
        // every route passing through auth knows that user is indeed verified and don't have to
        // verifiy in its main body everytime.
        req.username = userDetails.username;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// Signup endpoint
app.post("/signup", (req, res) => {
  console.log(users);

  const user = users.find((user) => user.username === req.body.username);
  if (user) {
    res.status(200).json({
      message: "Username already exists",
    });
  } else {
    users.push({
      username: req.body.username,
      password: req.body.password,
      favBook: req.body.favBook,
    });
    res.status(200).json({
      message: "Successfully signed up !",
    });
  }
});

// Signin Endpoint
app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    ); // convert their Username to a JWT, by encoding
    // user.token = token; No need to store token in DB anymore, JWTs are Stateless tokens
    res.status(200).json({
      loggedIn: true,
      token: token,
      message: "Successfully Signed In !",
    });
    console.log(users);
  } else {
    res.status(403).json({
      message: "Invalid username or password",
    });
  }
});

// Me Endpoint, anything that requires the server to return users token for validation
app.get("/user", auth, (req, res) => {
  //Now req.username is always Valid as it comes through auth middleware
  const username = req.username;
  const user = users.find((user) => user.username === username);
  if (user) {
    res.status(200).json({
      username: user.username,
      favBook: user.favBook,
      // can also return password here
    });
  } else {
    res.status(403).send("Invalid Token");
  }
});

app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT} !`);
});
