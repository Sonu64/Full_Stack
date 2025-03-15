const express = require("express");
const app = express();
const PORT = 3000;

// Dynamic Routes using Route Parameters

app.get("/sum/:a/:b", (req, res) => {
  const sum = parseInt(req.params.a) + parseInt(req.params.b);
  res.status(200).json([
    {
      ans: sum,
    },
  ]);
});

app.get("/diff/:a/:b", (req, res) => {
  const diff = parseInt(req.params.a) - parseInt(req.params.b);
  res.status(200).json([
    {
      ans: diff,
    },
  ]);
});

app.get("/product/:a/:b", (req, res) => {
  const product = parseInt(req.params.a) * parseInt(req.params.b);
  res.status(200).json([
    {
      ans: product,
    },
  ]);
});

app.get("/quotient/:a/:b", (req, res) => {
  const quotient = parseInt(req.params.a) / parseInt(req.params.b);
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
