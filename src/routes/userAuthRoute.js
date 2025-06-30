const express = require("express");
const { db } = require("../config/db");
const router = express.Router();
const crypto = require("crypto");

// save user to db
router.post("/save-user", async (req, res) => {
  const userInfo = req.body;

  userInfo.password = crypto
    .createHash("sha256")
    .update(userInfo.password)
    .digest("hex");

  // check if email is valid
  if (!userInfo.email.includes("@")) {
    return res.status(400).send({ message: "Invalid email" });
  }

  console.log("userInfo", userInfo);

  // check if user already exists
  const user = await db.collection("users").findOne({ email: userInfo.email });
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  userInfo.createdAt = new Date();

  try {
    const result = await db.collection("users").insertOne(userInfo);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
