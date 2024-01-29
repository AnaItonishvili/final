const express = require("express");
const userRoutes = express.Router();
let bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const dbo = require("../db/conn");
const authenticateToken = require("../middlewares/jwt");

userRoutes.route("/auth").get(authenticateToken, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({ message: "Authentication successful", user });
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "JsonWebTokenError") {
      res.status(403).json({ error: "Authentication failed. Invalid token." });
    } else if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Authentication failed. Token expired." });
    } else {
      res.status(500).json({ error: "An error occurred during authentication." });
    }
  }
});

userRoutes.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = dbo.getDb();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed. Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed. Invalid email or password." });
    }

    const token = jwt.sign({ username: user.username }, process.env.jwtSecret, { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }).status(200).json({ message: "Authentication successful", username: user.username });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "An error occurred while logging in." });
  }
});

async function generateUniqueRandomUsername(db) {
  while (true) {
    const randomWords = ["apple", "banana", "cherry", "grape", "kiwi"];
    const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    const generatedUsername = `${randomWord}_${randomSuffix}`;

    const existingUser = await db.collection("users").findOne({ username: generatedUsername });

    if (!existingUser) {
      return generatedUsername;
    }
  }
}

userRoutes.route("/register").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = dbo.getDb();

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const randomUsername = await generateUniqueRandomUsername(db);

    let myobj = { email, password: hashedPassword, username: randomUsername };

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already taken." });
    }

    const result = await db.collection("users").insertOne(myobj);
    if (result.acknowledged) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ error: "User registration failed" });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "An error occurred while registering user." });
  }
});

module.exports = userRoutes;
