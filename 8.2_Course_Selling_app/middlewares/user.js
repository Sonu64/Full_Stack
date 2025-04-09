const  jwt  = require("jsonwebtoken");
require("dotenv").config();

const userMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedData = await jwt.verify(token, process.env.JWT_USER_SECRET);

  if (decodedData) {
    req.userID = decodedData.userID;
    next();
  } else {
    res.status(503).json({ error: "Unauthorized User !" });
    return 0;
  }
};

module.exports = {
    userMiddleware:userMiddleware;
}