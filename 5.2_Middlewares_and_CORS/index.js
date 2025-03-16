const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // as we wanna show what express.json() uses under the hood
const cors = require("cors");
const PORT = 3001;
let numberOfRequests = 0;

// Middlewares
app.use(bodyParser.json()); // or use express.json() simply ! Express under the hood uses body-parser
// bodyParser.json() returns the name of a higher order function, so has to CALL it using ().
// Normally for middlewares we just pass the name of the higher order function, as shown below
// Defining our own Middleware
// Anything below it will use this middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.220.1:3000"],
  })
);

const loggerMiddleWare = (req, res, next) => {
  numberOfRequests++;
  console.log(`Request Number: ${numberOfRequests}`);
  console.log(`Request Route: ${req.url}`);
  console.log(`Request Host: ${req.hostname}`);
  console.log(`Sum = ${parseInt(req.body.a) + parseInt(req.body.b)}\n\n`); // NaN if cors disabled
  next();
};

app.get("/admin", (req, res) => {
  res.status(200).send("Admin Route Hit");
});

app.use(loggerMiddleWare); // We don't want Admin route to use the logger Middleware
app.post("/", (req, res) => {
  const sum = parseInt(req.body.a) + parseInt(req.body.b);
  res.status(200).json([
    {
      ans: sum, // CORS error in console if cors disabled
    },
  ]);
});

app.listen(PORT, () => {
  console.log("Listening on Port 3001 !");
});
