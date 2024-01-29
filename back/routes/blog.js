const express = require("express");
const blogRoutes = express.Router();

const dbo = require("../db/conn");

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

module.exports = blogRoutes;
