const express = require("express");
const app = express();
const PORT = 5000;
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/v1/user", userRouter);
//It means:
//"For any request that starts with /user, forward it to userRouter to handle."
// Now, within userRouter.js, you define routes without the /users part:
// Common Prefix /api/v1/user in index.js, different end routes in userRouter
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`App running successfully on Port ${PORT}.`);
});
