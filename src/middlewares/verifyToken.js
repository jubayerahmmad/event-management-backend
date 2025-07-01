const { db } = require("../config/db");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("authHeader", authHeader);

  if (!authHeader) {
    return res
      .status(401)
      .send({ message: "No Token Provided, Unauthenticated user" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  const user = await db.collection("users").findOne({ token });

  if (!user) {
    return res
      .status(401)
      .send({ message: "Invalid token, Unauthorized user" });
  }

  req.user = user;

  next();
};

module.exports = verifyToken;
