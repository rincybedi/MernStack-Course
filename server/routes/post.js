const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

router.post('/createpost', requireLogin, (req, res) => {
  const { title, body, pic } = req.body;
  if (!title || !body || !pic) {
    return res.status(422).json({ error: 'Please add all the fields' });
  }
  req.user.password = undefined;
  const postModel = new Post({
    title,
    body,
    postedBy: req.user,
    photo: pic,
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

router.get('/allposts', requireLogin, (req, res) => {
  Post.find()
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/getsubposts', requireLogin, (req, res) => {
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')

    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/myposts', requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy')
    .sort('-createdAt')

    .then((posts) => {
      res.json({
        myposts: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put('/like', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json(result);
  });
});

router.put('/unlike', requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json(result);
  });
});

router.put('/comment', requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { comments: comment } },
    { new: true }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      return res.json(result);
    });
});

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.json({ error: err });
          });
      }
    });
});

router.put('/deletecomment', requireLogin, (req, res) => {
  try {
    Post.find({ _id: req.body.postId }),
      (post) => {
        console.log(post);
        var comment = post.comments.filter((c) => c._id == req.body.commentId);
        console.log('right');
        var comment_Index = post.comments
          .map((c) => c_id)
          .indexOf(req.body.commentId);
        console.log('right');

        if (comment && comment.length) {
          post.comments.splice(comment_Index, 1);
          post.save();
          console.log('right');
          return res.json({ post, comment });
        }
      };
  } catch (err) {
    return res.status(422).json({ error: err });
  }
});

module.exports = router;
