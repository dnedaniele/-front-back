const express = require("express");
const router = express.Router();

//post Model

const Posts = require("../../models/Posts");

// GET Request

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("No Items");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// POST Request
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);
  try {
    const post = await newPost.save();
    if (!post) throw Error("error in the saving process");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
