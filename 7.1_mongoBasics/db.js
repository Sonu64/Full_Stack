const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Creating Schemas
const UsersSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  fullName: String,
  password: String,
});

const TodosSchema = new Schema({
  description: String,
  completed: Boolean,
  UserID: ObjectId,
});

//Creating Models, kaunse collection me daalna hai
/** Syntax: const ModelName = mongoose.model(CollectionName, Schema), to insert data to
 * CollectionName with the specified Schema */

// MongoDB collection names are case-insensitive on Windows and macOS (default Mac filesystem)

const UserModel = mongoose.model("users", UsersSchema); // Users is same as users
const TodoModel = mongoose.model("todos", TodosSchema); // Todos is same as todos

// Exporting Models using CommonJS Syntax
module.exports = {
  UserModel,
  TodoModel,
};
