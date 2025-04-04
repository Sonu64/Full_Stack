const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 5000;
const users = [];
const cors = require("cors");
const JWT_SECRET = "nfsd89f7sdnsd89cn98dss";

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Authorization Middleware that verifies req.username
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedData = jwt.verify(token, JWT_SECRET);
      req.username = decodedData.username;
      next();
    } catch (err) {
      res.status(403).json({ // Never forget response status code in Invalid token Auth check as if you simply skip status 200 OK will be sent to FE and undefined values will be in the FE.
        message: "Invalid Token !",
      });
    }
  } else {
    res.json({
      message: "Missing Token",
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
  } else {
    res.status(200).json({
      errorMessage: "Invalid username or password",
    });
  }
});

// User Endpoint, anything that requires the server to return users token for validation
app.get("/user", auth, (req, res) => {
  //Now req.username special req prop is added via Auth Middleware, ONLY IF TOKEN IS VALID !!!
  const username = req.username;
  const user = users.find((user) => user.username === username);
  if (user) {
    res.status(200).json({
      username: user.username,
      favBook: user.favBook,
      // can also return password here
    });
  } else {
    res.status(403).send("Invalid Token"); // This section actually doesn't run, token validity already checked in auth
  }
});

app.listen(PORT, () => {
  console.log(`App Listening on Port ${PORT} !`);
});
