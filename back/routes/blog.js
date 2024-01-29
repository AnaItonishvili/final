const express = require("express");
const blogRoutes = express.Router();

const dbo = require("../db/conn");
const authenticateToken = require("../middlewares/jwt");

blogRoutes.route("/blogs").get(async (req, res) => {
    try {
        const db = dbo.getDb();

        const data = await db.collection("blogs").find({}).limit(4).toArray();
        res.json(data);
    } catch (err) {
        console.error("Error fetching data from MongoDB:", err);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

blogRoutes.route("/create").post(authenticateToken, async (req, res) => {
    try {
      const db = dbo.getDb();
      const { image, title, content, createdDate } = req.body;
  
      const newBlogPost = {
        src: image,
        title: title,
        content: content,
        createdDate: createdDate,
      };
  
      const result = await db.collection("blogs").insertOne(newBlogPost);
  
      if (result.acknowledged) {
        res.status(201).json({ message: "Blog post created successfully" });
      } else {
        res.status(500).json({ error: "Blog post creation failed" });
      }
    } catch (err) {
      console.error("Error creating blog post:", err);
      res.status(500).json({ error: "An error occurred while creating the blog post." });
    }
  });

module.exports = blogRoutes;
