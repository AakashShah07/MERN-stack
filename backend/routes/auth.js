const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//Route1:- Create a uer using POST "/api/auth" . Dosn't requre auth
router.post(
  "/createuser",
  [
    body("email").isEmail(),

    body("name").isLength({ min: 3 }),

    body("password")
      .not()
      .isIn(["123", "password", "god"])
      .withMessage("Do not use a common word as the password")
      .isLength({ min: 5 })
      .matches(/\d/),
  ],
  async (req, res) => {
    let success  = false ;
    // If There are the error return Bad request with errrors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // Check wether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with email alread exixst" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "" + process.env.JWT_KEY);
      //  console.log(jwtData) ;
      success = true ;
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
    }
  }
);


// Route 2:- Autheciticate a uer using POST "/api/auth/login" . Dosn't requre auth
router.post("/login",
  [
    body("email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false ;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login woth correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false ;
        return res
          .status(400)
          .json({
            success,
            error:
              "Please try to login woth correct credentials password error",
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "" + process.env.JWT_KEY);
      success = true ;

      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


// Route 3: Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post("/getuser",fetchuser, async (req, res) => {

try {
   userId = req.user.id ;
  const user = await User.findById(userId).select("-password") ;
  res.send(user) ;  
}
 catch (error) {
  console.log(error.message);
      res.status(500).send("Internal server error");
} 
});

module.exports = router;
