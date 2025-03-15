const { error } = require("console");
const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

let todos = [];
let success = false;

// Middleware to parse JSON request body (Not taught in 4.2 but this makes things pretty)
app.use(express.json());

fs.readFile("todos.json", "utf-8", (err, data) => {
  if (err) {
    success = false;
    return;
  } else {
    data = JSON.parse(data);
    for (const todo of data) {
      todos.push(todo); // Please Add JSON.parse() to Notes
    }
    success = true;
  }
});

// Get Todos
app.get("/todoapp", (req, res) => {
  if (success) res.status(200).json(todos);
  else res.status(500).send("Error, No Todos File found !");
});

// Create Todo
app.post("/todoapp", (req, res) => {
  if (success) {
    //console.log(req.body);
    let task = {
      id: Date.now(),
      name: req.body["name"],
    };
    todos.push(task);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) res.status(500).send("Error creating todo !");
      // Add JSON.stringify() to Notes
      else {
        res.status(200).json(todos);
      }
    });
  } else res.status(500).send("Error, No Todos File found !");
});

// Delete Todo
app.delete("/todoapp", (req, res) => {
  if (success) {
    let newTodos = todos.filter((todo) => {
      return todo.id !== req.body.id;
    });
    todos = [...newTodos];
    res.status(200).json(todos);
  } else res.status(500).send("Error, No Todos File found !");
});

// Update Todo
app.put("/todoapp", (req, res) => {
  if (success) {
    let matchingIDFound = false;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === req.body.id) {
        matchingIDFound = true;
        todos[i].name = req.body.name;
      }
    }
    if (matchingIDFound) res.status(200).json(todos);
    else res.status(400).send("No Matching ID Found ! Task doesn't exist !");
  } else res.status(500).send("Error, No Todos File found !");
});

app.listen(port, () => {
  console.log(`Todo App listening on port ${port}`);
});
