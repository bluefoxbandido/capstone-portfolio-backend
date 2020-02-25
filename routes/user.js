const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.json("User DB");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user === null) {
      res.json(false);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        let token = jwt.sign({ email: user.email }, "secret", {
          expiresIn: 1000
        });
        res.json({
          user: user,
          success: true,
          err: null,
          token
        });
      } else {
        console.log("Entered password and Hash do not match!");
        res.status(401).json({
          success: false,
          token: null,
          err: "Entered Password and Hash do not match!"
        });
      }
    });
  });
});

router.get("/me", auth, (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error fetching all one user"));
});

module.exports = router;
