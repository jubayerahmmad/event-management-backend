const express = require("express");
const { db } = require("../config/db");
const router = express.Router();
const crypto = require("crypto");

const userCollection = db.collection("users");

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
  const user = await userCollection.findOne({ email: userInfo.email });
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  userInfo.createdAt = new Date();
  userInfo.token = crypto.randomBytes(32).toString("hex");

  try {
    const result = await userCollection.insertOne(userInfo);

    if (result.insertedId) {
      // Send back necessary info
      const responseUser = {
        _id: result.insertedId,
        name: userInfo.name,
        email: userInfo.email,
        photoURL: userInfo.photoURL,
        token: userInfo.token,
      };

      return res.status(200).send(responseUser);
    } else {
      return res.status(500).send({ message: "Failed to save user" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

// login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  // check if user is registered
  const user = await userCollection.findOne({
    email,
    password: hashedPassword,
  });

  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  // generate token
  const token = crypto.randomBytes(32).toString("hex");

  // save token to db
  await userCollection.updateOne({ email }, { $set: { token } });

  res.status(200).send({
    email: user.email,
    name: user.name,
    photoURL: user?.photoURL || "https://i.ibb.co/KX2TZyk/man.png",
    token,
  });
});

module.exports = router;
