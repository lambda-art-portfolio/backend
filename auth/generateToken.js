const jwt = require("jsonwebtoken");
const secret = require("./secrets").jwtSecret;

module.exports = user => {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
};
