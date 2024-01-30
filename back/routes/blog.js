const express = require("express");
const blogRoutes = express.Router();

const dbo = require("../db/conn");
const authenticateToken = require("../middlewares/jwt");
const { ObjectId } = require("mongodb");

blogRoutes.route("/blog/:id").get(async (req, res) => {
  try {
    const db = dbo.getDb();
    const blogId = req.params.id;

    const blog = await db.collection("blogs").findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    res.json(blog);
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

blogRoutes.get('/blogs/sort', async (req, res) => {
  try {
    const db = dbo.getDb();
    const { sort } = req.query;

    let sortCriteria;
    switch (sort) {
      case 'title_asc':
        sortCriteria = { title: 1 };
        break;
      case 'title_desc':
        sortCriteria = { title: -1 };
        break;
      case 'date_asc':
        sortCriteria = { createdDate: 1 };
        break;
      case 'date_desc':
        sortCriteria = { createdDate: -1 };
        break;
      default:
        return res.status(400).json({ error: 'Invalid sort parameter' });
    }

    const blogs = await db.collection("blogs").find({}).sort(sortCriteria).toArray();

    res.json(blogs);
  } catch (err) {
    console.error("Error fetching sorted data from MongoDB:", err);
    res.status(500).json({ error: "An error occurred while fetching sorted data." });
  }
});

blogRoutes.route("/blogs").get(async (req, res) => {
  try {
    const db = dbo.getDb();

    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const skip = limit ? (page - 1) * limit : 0;

    const total = await db.collection("blogs").countDocuments();

    let query = db.collection("blogs").find({}).sort({ createdDate: -1 });

    query = query.skip(skip);

    if (limit > 0) {
      query = query.limit(limit);
    }

    const blogs = await query.toArray();

    res.json({
      total,
      blogs
    });
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});


blogRoutes.route("/recents").get(async (req, res) => {
  try {
    const db = dbo.getDb();

    const data = await db.collection("blogs")
      .find({})
      .sort({ createdDate: -1 })
      .limit(4)
      .toArray();

    res.json(data);
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

blogRoutes.route("/create").post(authenticateToken, async (req, res) => {
  try {
    const db = dbo.getDb();
    const { image, title, content, createdDate, username } = req.body;

    const newBlogPost = {
      src: image,
      title: title,
      content: content,
      createdDate: createdDate,
      username: username,
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
