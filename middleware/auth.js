const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ msg: "Auth Error" });
  }

  jwt
    .verify(token, "secret")
    .then((req, res) => {
      req.user = res.user;
      console.log(user);
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(400).json("Error Verifying [AUTH.js LINE 16] ");
    });
};
