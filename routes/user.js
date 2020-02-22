const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("User Submitted", email, password);

  User.findOne({ email: email }).then(user => {
    console.log("User Found: ", user);
    if (user === null) {
      res.json(false);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        console.log("Valid");

        let token = jwt.sign({ email: user.email }, "secret", {
          expiresIn: 1000
        });
        res.json({
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

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
