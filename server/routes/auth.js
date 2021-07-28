const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const { JWT_SECRET, SENDGRID_API, EMAIL_URL } = require("../config/keys");
const crypto = require("crypto");
const requireLogin = require("../middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const trasnporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: SENDGRID_API,
    },
  })
);

router.get("/", (req, resp) => {
  resp.send("hello user");
});

router.post("/signup", (req, resp) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    resp.status(422).json({ error: "Please enter all fields" });
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
          .then((userDetails) => {
            trasnporter.sendMail({
              to: userDetails.email,
              from: "manpreetkaurbedi.mb@gmail.com",
              subject: "Sign Up Success",
              html: "<h2>Welcome to Instagram. Have fun!</h2>",
            });
            return resp.status(200).json({
              message: "Congrats, Account added for " + userDetails.name + "!!",
            });
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
    res.status(422).json({ error: "Please enter email and password" });
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

router.post("/resetpassword", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Oops, user doesnt exist for the email!!" });
      }
      user.resetToken = token;
      user.exprireToken = Date.now() + 3600000;
      user.save().then((result) => {
        trasnporter.sendMail({
          to: user.email,
          from: "manpreetkaurbedi.mb@gmail.com",
          subject: "Reset Password",
          html: `<p>You requested for a password reset.</p>
          <h4>Click on this  <a href ="${EMAIL_URL}/reset/${token}">link</a> to reset.</h4>`,
        });
        res.json({ message: "Please check your mail!" });
      });
    });
  });
});

router.post("/newpassword", (req, res) => {
  const newPassword = req.body.password;
  const token = req.body.token;
  User.findOne({
    resetToken: token,
    exprireToken: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "Please try again, Session expired :(" });
      }
      bcrypt.hash(newPassword, 12).then((hashedPassword) => {
        (user.password = hashedPassword),
          (user.resetToken = undefined),
          (user.exprireToken = undefined);
        user.save().then((result) => {
          return res.json({ message: "Password updated succesfully." });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
