const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');
const auth = require('../middleware/auth');

// router.post(
//     '/signup',
//     [
//         check('username', 'Please enter a valid username')
//             .not()
//             .isEmpty(),
            
//         check('email', "Please enter a valid email")
//             .isEmail(),

//         check('password', "Please enter a valid password")
//             .isLength({
//                 min: 6
//             }),
//         check('admin', "Please enter admin status")
//             .isBoolean()
//     ],

//     async (req, res) => {
//         const errors = validationResult(req);

//         if(!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             });
//         }

//         const {
//             username,
//             email,
//             password,
//             admin
//         } = req.body;

//         try {
//             let user = await User.findOne({
//                 email
//             });

//             if (user) {
//                 return res.status(400).json({
//                     msg: "User already exists"
//                 });
//             }

//             user = new User({
//                 username,
//                 email,
//                 password,
//                 admin
//             });

//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);

//             await user.save();

//             const payload = {
//                 user: {
//                     id: user.id
//                 }
//             };

//             jwt.sign(
//                 payload,
//                 'secret', {
//                     expiresIn: 10000
//                 },
//                 (err, token) => {
//                     if (err) throw err;
//                     res.status(200).json({
//                         token
//                     });
//                 }
//             );
//         } catch(err) {
//             console.log(err.message);
//             res.status(500).send("Error Saving");
//         }
//     }
// );

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("User Submitted", email, password);

    User.findOne({ 'email': email })
        .then((user) => {
            console.log("User Found: ", user);
            if (user === null) {
                res.json(false);
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    console.log("Valid");
                    
                    let token = jwt.sign({ email: user.email }, 'secret', { expiresIn: 1000 })
                    res.json({
                        success: true,
                        err: null,
                        token
                    });
                }
                else {
                    console.log("Entered password and Hash do not match!");
                    res.status(401).json({
                        success: false,
                        token: null,
                        err: 'Entered Password and Hash do not match!'
                    });
                }
            })
        })
})

// router.post(
//     "/login",
//     [
//         check('email', "Please enter a valid email").isEmail(),
//         check('password', "Please enter a valid password").isLength({
//             min: 6
//         })
//     ],

//     async (req, res) => {
//         const errors = validationResult(req);

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             });
//         }

//         const { email, password } = req.body;

//         try {
//             let user = await User.findOne({
//                 email
//             });

//             if (!user) {
//                 return res.status(400).json({
//                     message: "User does not exist"
//                 });
//             }

//             const isMatch = await bcrypt.compare(password, user.password);
            
//             if (!isMatch) {
//                 return res.status(400).json({
//                     msg: "Incorrect password"
//                 });
//             }

//             const payload = {
//                 user: {
//                     id: user.id
//                 }
//             };

//             jwt.sign(
//                 payload, 
//                 'secret',
//                 {
//                     expiresIn: 3600
//                 },
//                 (err, token) => {
//                     if (err) throw err;
//                     res.status(200).json({
//                         token
//                     });
//                 }
//             );
//         } catch (e) {
//             console.error(e);
//             res.status(500).json({
//                 msg: "Server Error"
//             })
//         }
//     }
// )


router.get("/me", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;