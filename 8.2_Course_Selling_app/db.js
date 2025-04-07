const mongoose = require("mongoose");
const Schema = mongoose.Schema();
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  fullName: String,
  password: String,
});

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  fullName: String,
  password: String,
});

const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorID: ObjectId,
});

const PurchasesSchema = new Schema({
  courseID: ObjectId,
  userID: ObjectId,
});

const UserModel = mongoose.model("users", UserSchema);
const AdminModel = mongoose.model("admins", AdminModel);
const CourseModel = mongoose.model("courses", CourseSchema);
const PurchasesModel = mongoose.model("purchases", PurchasesSchema);

module.exports = {
  UserModel: UserModel,
  AdminModel: AdminModel,
  CourseModel: CourseModel,
  PurchasesModel: PurchasesModel,
};
