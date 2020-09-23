const { response } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(404).json({ error: err });
          }
          return res.json({ user, posts });
        });
    })
    .catch((error) => {
      return res.status(404).json({ error });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err || !result) {
      return res.status(422).json({ error: err });
    }
    User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.body.followId },
      },
      {
        new: true,
      }
    )
      .select("-password")
      .exec()
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((error) => {
        return res.status(422).json(error);
      });
  });
});

router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }

    User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body.unfollowId },
      },
      {
        new: true,
      }
    )
      .select("-password")
      .exec()
      .then((result) => {
        return res.json(result);
      })
      .catch((error) => {
        return res.status(422).json(error);
      });
  });
});

router.put("/updatepic", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { pic: req.body.pic },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      return res.json(result);
    }
  );
});

module.exports = router;
