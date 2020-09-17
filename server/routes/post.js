const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  req.user.password = undefined;
  const postModel = new Post({
    title,
    body,
    postedBy: req.user,
  });

  postModel
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allposts", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myposts", requireLogin, (req, res) => {
  console.log(req.user._id);
  Post.find({ postedBy: req.user._id })
    .populate("postedBy")
    .then((posts) => {
      console.log(posts);
      res.json({
        myposts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;


