const express = require("express");
const app = express();
const PORT = 3000;

// Request Parameters like localhost:3000/quotient?a=10&b=30

app.get("/sum", (req, res) => {
  const sum = parseInt(req.query.a) + parseInt(req.query.b);
  res.status(200).json([
    {
      ans: sum,
    },
  ]);
});

app.get("/diff", (req, res) => {
  const diff = parseInt(req.query.a) - parseInt(req.query.b);
  res.status(200).json([
    {
      ans: diff,
    },
  ]);
});

app.get("/product", (req, res) => {
  const product = parseInt(req.query.a) * parseInt(req.query.b);
  res.status(200).json([
    {
      ans: product,
    },
  ]);
});

app.get("/quotient", (req, res) => {
  const quotient = parseInt(req.query.a / parseInt(req.query.b);
  res.status(200).json([
    {
      ans: quotient,
    },
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}`);
});
