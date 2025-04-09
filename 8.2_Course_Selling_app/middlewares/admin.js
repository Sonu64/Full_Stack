const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const adminMiddleware = async (req, res, next) => {
  const token = await req.headers.authorization;
  console.log("Token is : " + token);
  console.log("\nKey is " + JWT_ADMIN_SECRET);
  const decodedData = jwt.verify(token, JWT_ADMIN_SECRET);

  if (decodedData) {
    req.adminID = decodedData.adminID;
    next();
  } else {
    res.status(503).json({ error: "Unauthorized Admin !" });
    return 0;
  }
};

module.exports = {
  adminMiddleware: adminMiddleware,
};
