const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 3000;
const users = [];
const JWT_SECRET = "nfsd89f7sdnsd89cn98dss";

// Middlewares
app.use(express.json());

// Signup endpoint
app.post("/signup", (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user) {
    res.status(200).json({
      error: "Username already exists",
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
    });
    console.log(users);
  } else {
    res.status(403).json({
      message: "Invalid username or password",
    });
  }
});

// Me Endpoint, anything that requires the server to return users token for validation
app.get("/me", (req, res) => {
  const token = req.headers.authorization; // or we can name the header token and user req.headers.token
  const userDetails = jwt.verify(token, JWT_SECRET); // Decode back to username -> {username:"username"}

  // To fetch some data from the Database, we still have to hit database, but we find that user
  // from the username now, not a token stored in DB. Use the DB for authorization & real-time data (what they can do).
  const user = users.find((user) => userDetails.username === user.username);
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
