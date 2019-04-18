const jwt = require("jsonwebtoken");
const secret = require("./secrets").jwtSecret;

module.exports = (req, res, next) => {
  console.log("HEADERS: ", req.headers);
  console.log("BODY: ", req.body);
  const token = req.body.token ? req.body.token : req.headers.authorization;
  console.log("RESTRICT TOKEN: ", token);
  if (token) {
    console.log("Token Exists");
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log("Token Failed");
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        console.log("Token passed");
        req.decoded = decodedToken;
        delete req.body.token;
        next();
      }
    });
  } else {
    console.log("Token Does Not Exists");
    res.status(401).json({ message: "No token provided!" });
  }
};
