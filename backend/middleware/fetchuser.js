var jwt = require("jsonwebtoken");
JWT_KEY = "secret" ;
const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: " token not found" });
  }

  try {
    const data = jwt.verify(token,  "" + process.env.JWT_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error.message) ;
    res.status(401).send({ error: "please authenticate using a valid token" });  }
};

module.exports = fetchuser;
