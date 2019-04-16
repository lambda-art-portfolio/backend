const jwt = require("jsonwebtoken");
const secret = require("./secrets").jwtSecret;

module.exports = (req, res, next) => {
  const token = req.body.token ? req.body.token : req.headers.Authorization;
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decoded = decodedToken;
        delete req.body.token;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided!" });
  }
};
