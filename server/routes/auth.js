const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.get("/", (req, resp) => {
  resp.send("hello user");
});

router.post("/signup", (req, resp) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    resp.status(422).json({ error: "Please eneter all fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return resp.status(422).json({ error: "User exists for this email!!" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const userDetails = new User({
          email,
          password: hashedPassword,
          name,
          pic,
        });

        userDetails
          .save()
          .then((savedUser) => {
            return resp.status(200).json({ message: "User added :)" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Please enter  email and password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.status(200).json({ message: "Signed in successfully" });
          const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = savedUser;
          res.send({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          res.status(422).json({ error: "Invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello valid user");
});

module.exports = router;
